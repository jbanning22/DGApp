import { Test, TestingModule } from '@nestjs/testing';
import { HoleService } from './hole.service';

describe('HoleService', () => {
  let service: HoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoleService],
    }).compile();

    service = module.get<HoleService>(HoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
