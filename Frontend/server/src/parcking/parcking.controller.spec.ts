import { Test, TestingModule } from '@nestjs/testing';
import { ParckingController } from './parcking.controller';
import { ParckingService } from './parcking.service';

describe('ParckingController', () => {
  let controller: ParckingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParckingController],
      providers: [ParckingService],
    }).compile();

    controller = module.get<ParckingController>(ParckingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
