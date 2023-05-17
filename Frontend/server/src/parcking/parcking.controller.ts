import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParckingService } from './parcking.service';
import { CreateParckingDto } from './dto/create-parcking.dto';
import { UpdateParckingDto } from './dto/update-parcking.dto';

@Controller('parcking')
export class ParckingController {
  constructor(private readonly parckingService: ParckingService) {}

  @Post()
  create(@Body() createParckingDto: CreateParckingDto) {
    return this.parckingService.create(createParckingDto);
  }

  @Get()
  findAll() {
    return this.parckingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parckingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParckingDto: UpdateParckingDto) {
    return this.parckingService.update(+id, updateParckingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parckingService.remove(+id);
  }
}
