import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { NotFoundError } from 'rxjs';
import { SongService } from '../songs/song.service';
import { UsersService } from '../users/users.service';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { PlaylistsService } from './playlists.service';

@Controller('playlist')
export class PlaylistsController {
  constructor(
    private playlistService: PlaylistsService,
    private userService: UsersService,
    private songService: SongService,
  ) {}

  @Post('/create/:uuid')
  @UsePipes(ValidationPipe)
  async createPlaylist(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() playlistData: CreatePlaylistDto,
  ) {
    // const song = await this.songService.aSong(playlistData.songId);
    const user = await this.userService.getUser(uuid);
    if (!user) return new NotFoundException();
    return await this.playlistService.createPlaylist(playlistData, user);
  }

  @Post('/:uuid')
  async addToPlaylist(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() songId,
  ) {
    const playlist = await this.playlistService.getPlaylist(uuid);

    if (!playlist) throw new NotFoundException();
    const toBeAdded = await this.songService.aSong(songId.songId);

    return this.playlistService.addSongToPlaylist(playlist, toBeAdded);
  }

  @Get('p/:uuid')
  async getPlaylist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const playlist = this.playlistService.getPlaylist(uuid);

    if (!playlist) throw new NotFoundException();

    return playlist;
  }

  @Put(':uuid')
  async updateAPlaylist(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() songId,
  ) {
    const playlist = await this.playlistService.getPlaylist(uuid);

    if (!playlist) throw new NotFoundException();

    const toBeRemoved = await this.songService.aSong(songId.songId);

    return this.playlistService.removeSongAddedSong(playlist, toBeRemoved);
  }

  @Delete(':uuid')
  async deletePlaylist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.playlistService.deletePlaylist(uuid);
  }
}
