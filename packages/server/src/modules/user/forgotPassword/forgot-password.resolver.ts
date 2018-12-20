import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { changePasswordSchema } from '@example/common';

import { ForgotPasswordChangeInput } from './forgot-password.input';
import { User } from './../../../entities/User';
import { ErrorResponse } from './../../shared/ErrorResponse';
import { CustomContext } from './../../../types/Context';
import { createForgotPasswordLink } from './../../../utils/createForgotPasswordLink';
import { sendEmail } from './../../../utils/sendEmail';
import { formatYupError } from './../../../utils/formatYupError';
import { expiredKeyErrorMessage } from './../../../utils/errorMessages';
import { forgotPasswordPrefix } from './../../../constants';

@Resolver()
export class ForgotPasswordResolver {
  /**
   * Sends email with unique, expiring link to user's email address
   * @param email email of user who needs to reset pw
   */
  @Mutation(() => Boolean)
  async sendForgotPasswordEmail(
    @Arg('email') email: string,
    @Ctx() { redis }: CustomContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_HOST as string,
      user.id,
      redis
    );
    await sendEmail(email, url, 'Reset Password');
    return true;
  }

  /**
   * Change's user's password if valid key is presented
   * @param input newPassword, unique key (stored in redis)
   */
  @Mutation(() => ErrorResponse)
  async forgotPasswordChange(
    @Arg('input') { newPassword, token }: ForgotPasswordChangeInput,
    @Ctx() { redis }: CustomContext
  ) {
    const redisKey = `${forgotPasswordPrefix}${token}`;
    const userId = await redis.get(redisKey);
    if (!userId) {
      return {
        errors: [
          {
            path: 'change password',
            message: expiredKeyErrorMessage,
          },
        ],
      };
    }

    try {
      await changePasswordSchema.validate(
        { newPassword },
        { abortEarly: false }
      );
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updateUserPromise = User.update(
      { id: userId },
      { password: newHashedPassword }
    );

    const deleteKeyPromise = redis.del(redisKey);

    await Promise.all([updateUserPromise, deleteKeyPromise]);

    return {
      errors: [],
    };
  }
}
