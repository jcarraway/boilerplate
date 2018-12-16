import { Resolver, Query } from 'type-graphql';
import { User } from '../../../entities/User';

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me() {
    return User.findOne({ id: 'something' });
  }
}
