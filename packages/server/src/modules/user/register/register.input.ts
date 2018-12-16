import { User } from './../../../entities/User';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  userType: string;
}
