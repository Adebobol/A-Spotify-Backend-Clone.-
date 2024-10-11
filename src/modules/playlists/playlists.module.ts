import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from '../songs/song.module';
import { UsersModule } from '../users/users.module';
import { Playlist } from './playlist.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  imports: [UsersModule, SongsModule, TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
