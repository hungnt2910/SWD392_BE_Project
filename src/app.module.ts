/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './typeorm/entities/Role';
import { RoleModule } from './role/role.module';

import * as entities from './typeorm/entities';

@Module({
  imports: [ 
    JwtModule.register({
      global: true,
      secret: '123'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'learnnestjs',
      entities: Object.values(entities),
      synchronize: true
    }), UserModule, AuthModule, RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
