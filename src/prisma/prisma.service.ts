import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:password@discgolf-db.catbyilbmjzp.us-east-1.rds.amazonaws.com:5432/discgolf-db?schema=public',
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
