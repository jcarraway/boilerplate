import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { CustomBaseEntity } from './CustomBaseEntity';
import { Profile } from './Profile';

@Entity('users')
@ObjectType()
export class User extends CustomBaseEntity {
  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Field()
  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Field()
  @Column({ nullable: true })
  phoneVerified: boolean;

  @Field()
  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Field()
  @Column({ default: 'user' })
  userType: string;

  @Field()
  @Column('boolean', { default: false })
  confirmed: boolean;

  @Field()
  @Column('boolean', { default: false })
  accountLocked: boolean;

  @Field()
  @Column('int', { default: 0 })
  loginCount: number;

  @Field(() => ID)
  @Column('uuid', { nullable: true })
  profileId: string;

  @OneToOne(() => Profile, profile => profile.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  profile: Profile;
}
