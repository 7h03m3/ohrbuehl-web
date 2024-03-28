import { Test, TestingModule } from '@nestjs/testing';
import { EventsReportController } from './events-report.controller';

describe('EventsReportController', () => {
  let controller: EventsReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsReportController],
    }).compile();

    controller = module.get<EventsReportController>(EventsReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
