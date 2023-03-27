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

  getScorecardById(scorecardId: number) {
    return this.prisma.scorecard.findFirst({
      where: {
        id: scorecardId,
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

  async editScorecardById(id: number, dto: ScorecardDto, playerId: number) {
    const scorecard = await this.prisma.scorecard.findUnique({
      where: {
        id: id,
      },
    });

    if (!scorecard || scorecard.playerId !== playerId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.scorecard.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteScorecardById(playerId: number, id: number) {
    const scorecard = await this.prisma.scorecard.findUnique({
      where: {
        id,
      },
    });

    if (!scorecard || scorecard.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.scorecard.delete({
      where: {
        id,
      },
    });
  }
}
