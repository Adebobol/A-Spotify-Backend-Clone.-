import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './modules/songs/song.module';
import { ArtistsService } from './modules/artists/artists.service';
import { ArtistsController } from './modules/artists/artists.controller';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { PlaylistsController } from './modules/playlists/playlists.controller';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { Song } from './modules/songs/song.entity';
import 'dotenv/config';
import { Artist } from './modules/artists/artist.entity';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    SongsModule,
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
