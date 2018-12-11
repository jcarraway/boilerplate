import { Entity, Column, OneToOne } from 'typeorm';

import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';

@Entity('profiles')
export class Profile extends CustomBaseEntity {
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
