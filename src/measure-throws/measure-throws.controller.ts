import { Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MeasureThrowsService } from './measure-throws.service';

@Controller('measure-throws')
export class MeasureThrowsController {
  constructor(private measureThrowsService: MeasureThrowsService) {}

  @Get()
  getMeasuredThrows() {
    return this.measureThrowsService.getMeasuredThrows();
  }

  //   @Post()
  //   createMeasuredThrow(@GetUser()) {
  //     return this.measureThrowsService.createMeasuredThrow();
  //   }
}
