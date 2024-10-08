import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { Song } from '../songs/song.entity';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create.album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async createAlbum(albumData: CreateAlbumDto, songs: Song[]) {
    const newAlbum = new Album();
    newAlbum.title = albumData.title;
    // newAlbum.releaseDate = albumData.releaseDate;
    newAlbum.duration = albumData.duration;
    newAlbum.recordCompany = albumData.recordCompany;
    newAlbum.songs = songs;
    return this.albumRepository.save(newAlbum);
  }
  async aAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) throw new NotFoundException();

    return album;
  }
}
