import { Test, TestingModule } from '@nestjs/testing';
import { IntrestsService } from './intrests.service';

describe('IntrestsService', () => {
  let service: IntrestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntrestsService],
    }).compile();

    service = module.get<IntrestsService>(IntrestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
