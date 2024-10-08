import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Artist } from '../artists/artist.entity';
import { ArtistsService } from '../artists/artists.service';
import { SongUploadDto } from './dto/create.songs.dto';
import { Song } from './song.entity';
import { SongService } from './song.service';

@Controller('track')
export class SongController {
  constructor(
    private songService: SongService,
    private artistService: ArtistsService,
  ) {}

  @Post('upload-track')
  @UsePipes(ValidationPipe)
  async uploadSong(@Body() songData: SongUploadDto) {
    const { artistId, ...restOfData } = songData;
    let artist;
    if (artistId.length > 1) {
      artist = await Promise.all(
        artistId.map((indId) => this.artistService.getArtist(indId)),
      );
    } else {
      artist = await this.artistService.getArtist(artistId.toString());
    }

    return await this.songService.uploadSong(songData, artist);
  }

  @Get('all')
  async getAllSongs(): Promise<[Song[], number]> {
    return this.songService.allSongs();
  }

  @Get(':uuid')
  async getSong(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.songService.aSong(uuid);
  }

  @Put('/:uuid/update')
  async updateSong(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() songData: any,
  ) {
    // await this.songService.updateSong(id, songData);
    return await this.songService.updateSong(uuid, songData);
  }

  @Delete(':uuid/delete')
  async deleteSong(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return await this.songService.deleteSong(uuid);
  }
}
