import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScorecardDto } from './dto';

@Injectable()
export class ScorecardService {
  constructor(private prisma: PrismaService) {}

  getScorecards(playerId: number) {
    return this.prisma.scorecard.findMany({
      where: {
        playerId,
      },
      include: {
        holes: true,
      },
    });
  }

  getScorecardById(playerId: number, scorecardId: number) {
    return this.prisma.scorecard.findFirst({
      // return this.prisma.scorecard.findFirst({
      where: {
        id: scorecardId,
        playerId,
      },
      include: {
        holes: true,
      },
    });
  }

  async createScorecard(playerId: number, dto: ScorecardDto) {
    const scorecardData = [];
    for (let i = 1; i <= dto.courseLength; i++) {
      scorecardData.push({ holeNumber: i, par: 3, strokes: 3, playerId });
    }
    console.log(dto.courseLength, scorecardData, dto);
    const scorecard = await this.prisma.scorecard.create({
      data: {
        playerId,
        isCompleted: false,
        ...dto,
        holes: {
          createMany: {
            data: scorecardData,
          },
        },
      },
      include: {
        holes: true,
      },
    });
    return scorecard;
  }

  async parseOfflineData(playerId: number, dto: any) {
    const scorecards = dto.userData.scorecards;

    const createdScorecards = [];

    for (const scorecardData of scorecards) {
      const { scorecardData: holes, courseName, isCompleted } = scorecardData;

      for (const hole of holes) {
        hole.playerId = playerId;
      }

      const scorecard = await this.prisma.scorecard.create({
        data: {
          playerId,
          isCompleted,
          courseName,
          holes: {
            createMany: {
              data: holes,
            },
          },
          courseLength: holes.length,
        },
        include: {
          holes: true,
        },
      });

      createdScorecards.push(scorecard);
    }

    return createdScorecards;
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
      include: {
        holes: true,
      },
    });
  }

  async deleteScorecardById(playerId: number, scorecardId: number) {
    const scorecard = await this.prisma.scorecard.findUnique({
      where: {
        id: scorecardId,
      },
    });

    if (!scorecard || scorecard.playerId !== playerId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.scorecard.delete({
      where: {
        id: scorecardId,
      },
    });
  }
}
