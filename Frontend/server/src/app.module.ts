import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClimatModule } from './climat/climat.module';
import { ParckingModule } from './parcking/parcking.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/Parcking',
    ),
    UsersModule,
    AuthModule,
    ClimatModule,
    ParckingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
