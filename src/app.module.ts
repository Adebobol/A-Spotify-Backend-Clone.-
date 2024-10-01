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

@Module({
  imports: [
    SongsModule,
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Song],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ArtistsController, PlaylistsController],
  providers: [AppService, ArtistsService],
})
export class AppModule {}
