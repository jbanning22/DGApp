import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasureThrowsController } from './measure-throws.controller';
import { MeasureThrowsService } from './measure-throws.service';

@Module({
  controllers: [MeasureThrowsController],
  providers: [MeasureThrowsService, PrismaService],
})
export class MeasureThrowsModule {}
