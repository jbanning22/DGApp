import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HoleDto } from './dto';

@Injectable()
export class HoleService {
  constructor(private prisma: PrismaService) {}

  getHoles(playerId: number) {
    return this.prisma.hole.findMany({
      where: {
        id: playerId,
      },
    });
  }

  getHoleById(playerId: number, holeId: number) {
    return this.prisma.hole.findFirst({
      where: {
        id: holeId,
        playerId,
      },
    });
  }

  async createHole(playerId: number, dto: HoleDto, scorecardId: number) {
    const hole = await this.prisma.hole.create({
      data: {
        playerId,
        scorecardId,
        ...dto,
      },
    });
    return hole;
  }
}
