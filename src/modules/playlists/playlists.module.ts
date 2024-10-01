import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Module({
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
