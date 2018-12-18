import { Resolver, Query, Ctx } from 'type-graphql';

import { CustomContext } from './../../../types/Context';
import { User } from '../../../entities/User';

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: CustomContext) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }
}
