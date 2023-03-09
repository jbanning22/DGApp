import { Controller, Get, Post } from '@nestjs/common';
import { MeasureThrowsService } from './measure-throws.service';

@Controller('measure-throws')
export class MeasureThrowsController {
  constructor(private measureThrowsService: MeasureThrowsService) {}

  @Get()
  getMeasuredThrows() {
    return this.measureThrowsService.getMeasuredThrows();
  }

  @Post()
  createMeasuredThrows() {
    return this.measureThrowsService.createMeasuredThrow();
  }
}
