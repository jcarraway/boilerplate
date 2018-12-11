import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { CustomBaseEntity } from './CustomBaseEntity';
import { Profile } from './Profile';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text')
  password: string;

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
