import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Artist } from 'src/modules/artists/artist.entity';
import { Song } from 'src/modules/songs/song.entity';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  entities: [Song, Artist],
  synchronize: true,
};

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
//   inject: [ConfigService],
// };
