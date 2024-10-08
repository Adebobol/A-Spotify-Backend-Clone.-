import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../songs/song.entity';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @Column()
  // releaseDate: string;

  @Column()
  duration: string;

  @Column()
  recordCompany: string;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
