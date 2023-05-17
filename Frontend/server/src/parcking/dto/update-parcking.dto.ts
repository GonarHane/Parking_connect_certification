import { PartialType } from '@nestjs/mapped-types';
import { CreateParckingDto } from './create-parcking.dto';

export class UpdateParckingDto extends PartialType(CreateParckingDto) {}
