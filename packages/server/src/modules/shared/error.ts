import { ObjectType } from 'type-graphql';

@ObjectType()
export class Error {
  path: string;
  message: string;
}
