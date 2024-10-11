import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'playlist' })
  tag: string;

  @Column()
  name: string;

  // @Column()
  // numberOfSaves: string;

  @Column()
  about: string;

  // @Column()
  // numberOfSongs: string;

  // @Column()
  // totalTime: string;

  @ManyToOne(() => User, (User) => User.Playlist)
  creator: User;

  @OneToMany(() => Song, (song) => song.playlist)
  playlistTracks: Song[];
}
