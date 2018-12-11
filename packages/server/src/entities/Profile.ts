import { Entity, Column, OneToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';

@Entity('profiles')
@ObjectType()
export class Profile extends CustomBaseEntity {
  @Field()
  @Column('text', { nullable: true })
  name: string;

  // @Column({ nullable: true })
  // photoUrl: string;

  // @Column({ nullable: true })
  // photoKey: string;

  // @Column({ nullable: true })
  // bio: string;

  @Column('uuid')
  userId: string;

  @OneToOne(() => User, user => user.profile)
  user: User;
}
