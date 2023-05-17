/* import { Module } from '@nestjs/common'; */
 /* import { ClimatGateway } from './climat.gateway';  */
/* import { MongooseModule } from '@nestjs/mongoose';
import { Climat, ClimatSchema } from './entities/climat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Climat.name, schema: ClimatSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class ClimatModule {} */
import { Module } from "@nestjs/common";
import { ClimatGateway } from './climat.gateway'; //a mettre apres API
import { MongooseModule } from "@nestjs/mongoose";
import { Climat, ClimatSchema } from "./entities/climat.entity";
import { ClimatService } from "./climat.service";
import { ClimatController } from "./climat.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Climat.name, schema: ClimatSchema }]),
  ], //a mettre apres API decommenter
  providers: [ ClimatGateway, ClimatService],
  controllers: [ClimatController],
  exports: [ClimatService],
})
export class ClimatModule {}