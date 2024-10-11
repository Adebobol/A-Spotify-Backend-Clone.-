import { IsNotEmpty } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  about: string;

  // @IsNotEmpty()
  // name: string;
  // @IsNotEmpty()
  // songId: string;
}
