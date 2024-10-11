import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
  ) {}

  async createPlaylist(
    playlistData: CreatePlaylistDto,
    user: User,
  ): Promise<Playlist> {
    const newPlaylist = new Playlist();
    newPlaylist.name = playlistData.name;
    newPlaylist.about = playlistData.about;
    newPlaylist.creator = user;
    // newPlaylist.playlistTracks = [song];

    return await this.playlistRepo.save(newPlaylist);
  }

  async getPlaylist(id: string) {
    return await this.playlistRepo.findOne({
      where: { id: id },
      relations: ['creator', 'playlistTracks'],
    });
  }

  async addSongToPlaylist(playlist: Playlist, toBeAdded) {
    if (playlist.playlistTracks.indexOf(toBeAdded) < 1) {
      playlist.playlistTracks.push(toBeAdded);
    } else {
      return { message: 'Song Already Added' };
    }
    await playlist.save();
    return { message: 'Song Successfully Added.', playlist: playlist };
  }

  async removeSongAddedSong(playlist: Playlist, toBeRemoved) {
    const stillInPlaylist = playlist.playlistTracks.filter(
      (track) => track.id !== toBeRemoved.id,
    );
    // await this.playlistRepo.save({ playlistTracks: stillInPlaylist });
    playlist.playlistTracks = stillInPlaylist;
    return await playlist.save();
  }

  async deletePlaylist(id: string) {
    await this.playlistRepo.findOne({ where: { id: id } });
    return { message: 'Playlist deleted' };
  }
}
