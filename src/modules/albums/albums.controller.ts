import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';

import { SongService } from '../songs/song.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create.album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private albumService: AlbumsService,
    private songService: SongService,
  ) {}

  @Post('upload-album')
  @UsePipes(ValidationPipe)
  async uploadAlbum(@Body() albumData: CreateAlbumDto) {
    const { songId, ...restOfAlbumData } = albumData;
    const songs = await Promise.all(
      songId.map((id) => this.songService.aSong(id)),
    );
    return await this.albumService.createAlbum(albumData, songs);
  }

  @Get(':uuid')
  async getAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.albumService.aAlbum(uuid);
  }
}
