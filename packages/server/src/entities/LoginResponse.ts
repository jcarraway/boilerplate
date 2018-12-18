import { ObjectType, Field } from 'type-graphql';

import { User } from './User';
import { Error } from './Error';

@ObjectType()
export class LoginResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}
