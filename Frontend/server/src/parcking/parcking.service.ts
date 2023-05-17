import { Injectable } from '@nestjs/common';
import { CreateParckingDto } from './dto/create-parcking.dto';
import { UpdateParckingDto } from './dto/update-parcking.dto';

@Injectable()
export class ParckingService {
  create(createParckingDto: CreateParckingDto) {
    return 'This action adds a new parcking';
  }

  findAll() {
    return `This action returns all parcking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parcking`;
  }

  update(id: number, updateParckingDto: UpdateParckingDto) {
    return `This action updates a #${id} parcking`;
  }

  remove(id: number) {
    return `This action removes a #${id} parcking`;
  }
}
