import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:NeonDevTech1@34.86.11.189:5432/disc-golf-db?schema=public',
        },
      },
    });
  }
  cleanDb() {
    return this.$transaction([
      this.measuredThrow.deleteMany(),
      this.user.deleteMany(),
      this.scorecard.deleteMany(),
      this.hole.deleteMany(),
    ]);
  }
}
