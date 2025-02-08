/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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
      entities: [User],
      synchronize: true
    }), UserModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
