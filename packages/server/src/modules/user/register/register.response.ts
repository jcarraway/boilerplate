// import { User } from './../../../entities/User';
import { Error } from './../../shared/error';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class RegisterResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
