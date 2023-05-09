import { Module } from '@nestjs/common';
 /* import { ClimatGateway } from './climat.gateway';  */
import { MongooseModule } from '@nestjs/mongoose';
import { Climat, ClimatSchema } from './entities/climat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Climat.name, schema: ClimatSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class ClimatModule {}
