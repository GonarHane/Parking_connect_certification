import { Test, TestingModule } from '@nestjs/testing';
import { ParckingService } from './parcking.service';

describe('ParckingService', () => {
  let service: ParckingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParckingService],
    }).compile();

    service = module.get<ParckingService>(ParckingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
