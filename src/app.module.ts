import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [resolve(__dirname, '**/*.entity{.js,.ts}')],
        synchronize: false,
        migrationsRun: true, // Automatically run migrations on startup
        migrations: [resolve(__dirname + '**/database/migrations/*{.ts,.js}')], // Path to your migration files
      }),
      inject: [ConfigService],
    }),
    TodoModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
