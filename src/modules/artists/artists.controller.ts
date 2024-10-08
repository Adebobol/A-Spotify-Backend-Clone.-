import {
  Controller,
  Get,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { getBuiltinModule } from 'process';
import { brotliDecompressSync } from 'zlib';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create.artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get('/')
  async getAllArtist() {
    return await this.artistService.getAllArtist();
  }

  @Post('create-artist')
  @UsePipes(ValidationPipe)
  async createArtist(@Body() artist: CreateArtistDto) {
    return await this.artistService.createArtist(artist);
  }

  @Get(':uuid')
  async getArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.artistService.getArtist(uuid);
  }

  // @Put('update-/:uuid')
  // async updateArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return await this.artistService.updateArtist(uuid);
  // }
}
