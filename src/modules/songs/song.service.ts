import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongUploadDto } from './dto/create.songs.dto';
import { title } from 'process';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async uploadSong(songData: SongUploadDto): Promise<Song> {
    return await this.songRepository.save(songData);
  }

  async allSongs(): Promise<[Song[], number]> {
    // return await this.songRepository.find();
    return this.songRepository.createQueryBuilder('track').getManyAndCount();
  }

  async aSong(id: string): Promise<Song> {
    return await this.songRepository.findOne({ where: { id: id } });
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
