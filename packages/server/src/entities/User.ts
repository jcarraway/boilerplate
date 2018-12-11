import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { CustomBaseEntity } from './CustomBaseEntity';
import { Profile } from './Profile';

@Entity('users')
@ObjectType()
export class User extends CustomBaseEntity {
  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Field()
  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Field()
  @Column()
  userType: string;

  @Column('boolean', { default: false })
  confirmed: boolean;

  @Column('boolean', { default: false })
  accountLocked: boolean;

  @Column('int', { default: 0 })
  loginCount: number;

  @Column('uuid', { nullable: true })
  profileId: string;

  @OneToOne(() => Profile, profile => profile.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  profile: Profile;
}
