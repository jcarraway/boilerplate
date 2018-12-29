import { userSessionIdPrefix } from './../../../constants';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { LoginInput } from './login.input';
import { User } from '../../../entities/User';
import { LoginResponse } from '../../shared/LoginResponse';
import {
  invalidLoginMessage,
  accountLockedErrorMessage,
} from '../../../utils/errorMessages';
import { CustomContext } from './../../../types/Context';

const invalidLoginResponse = {
  errors: [
    {
      path: 'login',
      message: invalidLoginMessage,
    },
  ],
  user: undefined,
};

@Resolver()
export class LoginResolver {
  constructor() {}

  @Mutation(() => LoginResponse)
  async login(
    @Arg('input') input: LoginInput,
    @Ctx() ctx: CustomContext
  ): Promise<LoginResponse> {
    const { usernameOrEmail, password } = input;
    const { req, redis } = ctx;

    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: usernameOrEmail })
      .orWhere('user.username = :username', { username: usernameOrEmail })
      .getOne();

    if (!user) {
      return invalidLoginResponse;
    }

    if (user.accountLocked) {
      return {
        errors: [
          {
            path: 'login',
            message: accountLockedErrorMessage,
          },
        ],
        user: undefined,
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return invalidLoginResponse;
    }

    // add user's id to session stored in redis
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
