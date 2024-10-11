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
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @Post('upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        // .addMaxSizeValidator({
        //   maxSize: 8000,
        // })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

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
