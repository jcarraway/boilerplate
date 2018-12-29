import { ObjectType, Field } from 'type-graphql';

import { User } from './../../entities/User';
import { Error } from './../../entities/Error';

@ObjectType()
export class LoginResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}
