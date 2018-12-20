import { Error } from '../../entities/Error';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ErrorResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
