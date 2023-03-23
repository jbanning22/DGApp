import { Test, TestingModule } from '@nestjs/testing';
import { HoleController } from './hole.controller';

describe('HoleController', () => {
  let controller: HoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoleController],
    }).compile();

    controller = module.get<HoleController>(HoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
