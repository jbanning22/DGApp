import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScorecardDto } from './dto';

@Injectable()
export class ScorecardService {
  constructor(private prisma: PrismaService) {}

  getScorecards(playerId: number) {
    return this.prisma.scorecard.findMany({
      where: {
        id: playerId,
      },
    });
  }

  getScorecardById(playerId: number, scorecardId: number) {
    return this.prisma.scorecard.findFirst({
      where: {
        id: scorecardId,
        playerId,
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
