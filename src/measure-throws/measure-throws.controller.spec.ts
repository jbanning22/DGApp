import { Test, TestingModule } from '@nestjs/testing';
import { MeasureThrowsController } from './measure-throws.controller';

describe('MeasureThrowsController', () => {
  let controller: MeasureThrowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureThrowsController],
    }).compile();

    controller = module.get<MeasureThrowsController>(MeasureThrowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
