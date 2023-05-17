import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClimatService } from './climat.service';
import { CreateClimatDto } from './dto/create-climat.dto';


@Controller('climat')
export class ClimatController {
  constructor(private readonly climatservice: ClimatService) {}


  @Post()
  create(@Body() createclimat: CreateClimatDto) {
    return this.climatservice.create(createclimat);
  }

 
  @Get()
  findAll() {
    return this.climatservice.findAll();
  }

/*   @Get('histo')
  getClimatHisto() {
    return this.climatservice.getWeekClimat();
  } */
}