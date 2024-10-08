import { IsAlpha, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  //   @IsNotEmpty()
  //   releaseDate: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  recordCompany: string;

  @IsNotEmpty()
  songId;
}
