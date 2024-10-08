import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create.artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async createArtist(artistData: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.save(artistData);
  }

  async getAllArtist() {
    return await this.artistRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.releases', 'releases')
      .getMany();
  }

  async getArtist(id: string) {
    return this.artistRepository.findOne({
      where: { id: id },
      relations: ['releases'],
    });
  }

  // async updateArtist(id: string) {
  //   const artist = this.artistRepository.findOne({ where: { id: id } });

  //   if (!artist) throw new NotFoundException();

  //   this.artistRepository.merge();
  // }
}
