import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasuredThrowsDto } from './dto';
// import { GetUser } from 'src/auth/decorator';

@Injectable()
export class MeasureThrowsService {
  constructor(private prisma: PrismaService) {}

  getMeasuredThrows() {
    return 'msg: you have retrieved a measured throw';
  }

  async createMeasuredThrow(userId: number, dto: MeasuredThrowsDto) {
    const measuredThrow = await this.prisma.measuredThrow.create({
      data: {
        userId,
        ...dto,
      },
    });
    return measuredThrow;
  }
}
