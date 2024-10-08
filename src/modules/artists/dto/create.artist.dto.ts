import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  listeners: string;
}
