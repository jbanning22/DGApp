import { Test, TestingModule } from '@nestjs/testing';
import { MeasureThrowsService } from './measure-throws.service';

describe('MeasureThrowsService', () => {
  let service: MeasureThrowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureThrowsService],
    }).compile();

    service = module.get<MeasureThrowsService>(MeasureThrowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
