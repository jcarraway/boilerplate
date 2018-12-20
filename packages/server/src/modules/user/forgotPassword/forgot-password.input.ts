import { InputType, Field } from 'type-graphql';

@InputType()
export class ForgotPasswordChangeInput {
  @Field()
  newPassword: string;

  @Field()
  token: string;
}
