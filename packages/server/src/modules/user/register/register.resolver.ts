import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { registerSchema } from '@example/common';

import { RegisterInput } from './register.input';
import { Profile } from './../../../entities/Profile';
import { User } from './../../../entities/User';
import { userSessionIdPrefix } from './../../../constants';
import { CustomContext } from './../../../types/Context';
import { LoginResponse } from './../../shared/LoginResponse';
import { formatYupError } from './../../../utils/formatYupError';
import {
  usernameAlreadyExistsMessage,
  emailAlreadyExistsMessage,
} from './../../../utils/errorMessages';

@Resolver()
export class RegisterResolver {
  constructor() {}

  @Mutation(() => LoginResponse)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { req, redis }: CustomContext
  ): Promise<LoginResponse> {
    try {
      await registerSchema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        errors: formatYupError(err),
      };
    }

    const { email, username, password } = input;

    // check if username is already taken
    const usernameAlreadyExists = await User.findOne({
      where: { username },
    });

    if (usernameAlreadyExists) {
      return {
        errors: [
          {
            path: 'username',
            message: usernameAlreadyExistsMessage,
          },
        ],
      };
    }

    // check if email is already in use
    const emailAlreadyExists = await User.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      return {
        errors: [
          {
            path: 'email',
            message: emailAlreadyExistsMessage,
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      // @TODO: email confirm email link; set TRUE by default for now
      confirmed: true,
    }).save();

    // if user is created successfully, create profile
    if (user.id) {
      const profile = await Profile.create({
        userId: user.id,
      }).save();

      await User.update(user.id, { profile });
    }

    // log user in: add user's id to session stored in redis
    req.session!.userId = user.id;
    req.session!.userType = user.userType;
    console.log('req.session login resolver', req.session);
    if (req.sessionID) {
      await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
    }

    return {
      errors: [],
      user,
    };
  }
}
