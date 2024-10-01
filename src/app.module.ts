import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './modules/songs/songs.module';
import { ArtistsService } from './modules/artists/artists.service';
import { ArtistsController } from './modules/artists/artists.controller';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { PlaylistsController } from './modules/playlists/playlists.controller';
import { PlaylistsModule } from './modules/playlists/playlists.module';

@Module({
  imports: [SongsModule, ArtistsModule, AlbumsModule, PlaylistsModule],
  controllers: [AppController, ArtistsController, PlaylistsController],
  providers: [AppService, ArtistsService],
})
export class AppModule {}
