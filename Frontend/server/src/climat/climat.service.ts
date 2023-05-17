import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Climat } from './entities/climat.entity';
import { CreateClimatDto } from './dto/create-climat.dto';
import { UpdateClimatDto } from './dto/update-climat.dto';

@Injectable()
export class ClimatService {

  constructor(
    @InjectModel(Climat.name)
    private climatModel: mongoose.Model<Climat>,
  ) {}
    

  async create(createClimatDto: CreateClimatDto) {
    const res = await this.climatModel.create(createClimatDto);
    return res;
  }
 
  async findAll() {
    const climats = await this.climatModel.find();
    return climats;
  }

  async findOne(id: string) {
    const climat = await this.climatModel.findById(id);

    if (!climat) {
      throw new NotFoundException('Rien a été trouvé');
    }

    return climat;
  }

  async update(id: string, updateClimatDto: UpdateClimatDto) {
    return await this.climatModel.findByIdAndUpdate(id, updateClimatDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    return await this.climatModel.findByIdAndDelete(id);
  }

}