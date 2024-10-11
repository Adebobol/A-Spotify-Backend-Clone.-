import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerUser(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    userData: CreateUserDto,
  ) {
    return await this.userService.registerUser(userData);
  }

  @Get('/:uuid')
  async getUser(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<User> {
    return await this.userService.getUser(uuid);
  }
}
