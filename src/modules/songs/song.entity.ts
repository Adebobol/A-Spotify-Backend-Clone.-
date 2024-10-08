import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { ArtistsController } from '../artists/artists.controller';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  duration: string;

  @Column()
  stream: string;

  @Column({ default: 'song' })
  tag: string;

  @ManyToMany(() => Artist, (artist) => artist.releases)
  @JoinTable()
  artist: Artist[];

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}
