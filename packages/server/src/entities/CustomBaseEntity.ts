import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  VersionColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import * as shortid from 'shortid';

@ObjectType()
export class CustomBaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  shortLink: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field()
  @VersionColumn()
  version: number;

  @BeforeInsert()
  addShortLink() {
    this.shortLink = shortid.generate();
  }
}
