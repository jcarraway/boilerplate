import { User } from './../../../entities/User';
import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}
