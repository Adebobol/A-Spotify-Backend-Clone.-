import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Song } from '../songs/song.entity';

@Entity()
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  about: string;

  @Column()
  listeners: string;

  @ManyToMany(() => Song, (song) => song.artist)
  releases: Song[];
}
