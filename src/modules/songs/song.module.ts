import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [ArtistsModule, TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongsModule {}
