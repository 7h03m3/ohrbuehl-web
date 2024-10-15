import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationFilesService } from './application-files.service';

describe('ApplicationFilesService', () => {
  let service: ApplicationFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationFilesService],
    }).compile();

    service = module.get<ApplicationFilesService>(ApplicationFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
