import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async editScorecardById(
    playerId: number,
    scorecardId: number,
    dto: ScorecardDto,
  ) {
    const scorecard = await this.prisma.scorecard.findUnique({
      where: {
        id: playerId,
      },
    });

    if (!scorecard || scorecard.playerId !== playerId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.scorecard.update({
      where: {
        id: scorecardId,
      },
      data: {
        ...dto,
      },
    });
  }
}
