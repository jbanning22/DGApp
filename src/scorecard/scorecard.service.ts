import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScorecardDto } from './dto';

@Injectable()
export class ScorecardService {
  constructor(private prisma: PrismaService) {}

  getScorecards(userId: number) {
    return this.prisma.scorecard.findMany({
      where: {
        id: userId,
      },
    });
  }
  async createScorecard(playerId: number, dto: ScorecardDto) {
    const scorecard = await this.prisma.scorecard.create({
      data: {
        playerId,
        ...dto,
      },
    });
    return scorecard;
  }
}
