import { Test, TestingModule } from '@nestjs/testing';
import { DefaultValuesService } from './default-values.service';

describe('DefaultValuesService', () => {
  let service: DefaultValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultValuesService],
    }).compile();

    service = module.get<DefaultValuesService>(DefaultValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
