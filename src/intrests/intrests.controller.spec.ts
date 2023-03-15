import { Test, TestingModule } from '@nestjs/testing';
import { IntrestsController } from './intrests.controller';

describe('IntrestsController', () => {
  let controller: IntrestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntrestsController],
    }).compile();

    controller = module.get<IntrestsController>(IntrestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
