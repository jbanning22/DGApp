import { Module } from '@nestjs/common';
import { MeasureThrowsController } from './measure-throws.controller';
import { MeasureThrowsService } from './measure-throws.service';

@Module({
  controllers: [MeasureThrowsController],
  providers: [MeasureThrowsService],
})
export class MeasureThrowsModule {}
