import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongUploadDto } from './dto/create.songs.dto';
import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async uploadSong(songData: SongUploadDto, artis: Artist[]) {
    const newRelease = new Song();

    newRelease.title = songData.title;
    newRelease.year = songData.year;
    newRelease.duration = songData.duration;
    newRelease.stream = songData.stream;
    newRelease.artist = artis;

    return await this.songRepository.save(newRelease);
  }

  async allSongs(): Promise<[Song[], number]> {
    return this.songRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.artist', 'artist')
      .leftJoinAndSelect('artist.releases', 'releases')
      .getManyAndCount();
  }

  async aSong(id: string): Promise<Song> {
    return await this.songRepository.findOne({
      where: { id: id },
      relations: ['artists'],
    });
  }

  async updateSong(id: string, songData: Song): Promise<Song> {
    const song = await this.songRepository.findOne({ where: { id: id } });
    if (!song) throw new NotFoundException();
    this.songRepository.merge(song, songData);
    return this.songRepository.save(song);
  }
  async deleteSong(id: string) {
    const song = await this.songRepository.findOne({ where: { id: id } });

    if (!song) throw new NotFoundException();

    return this.songRepository.delete(id);
  }
}
