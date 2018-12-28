import { ObjectType, Field } from 'type-graphql';

import { Error } from '../../../entities/Error';

@ObjectType()
export class PhoneVerificationResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
}
