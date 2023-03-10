import { Controller, Get, Post, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { MeasuredThrowsDto } from './dto';
import { MeasureThrowsService } from './measure-throws.service';

@Controller('measure-throws')
export class MeasureThrowsController {
  constructor(private measureThrowsService: MeasureThrowsService) {}

  @Get()
  getMeasuredThrows() {
    return this.measureThrowsService.getMeasuredThrows();
  }

  @Post()
  createMeasuredThrow(
    @GetUser('id') userId: number,
    @Body() dto: MeasuredThrowsDto,
  ) {
    console.log(dto);
    return this.measureThrowsService.createMeasuredThrow(userId, dto);
  }
}
