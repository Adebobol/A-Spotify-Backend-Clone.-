import { IsNotEmpty } from 'class-validator';

export class SongUploadDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  stream: string;
}
