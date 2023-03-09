import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { GetUser } from 'src/auth/decorator';

@Injectable()
export class MeasureThrowsService {
  constructor(private prisma: PrismaService) {}

  getMeasuredThrows() {
    return 'msg: you have retrieved a measured throw';
  }

  createMeasuredThrow() {
    return 'msg: you successfully created a measured throw';
  }
}
