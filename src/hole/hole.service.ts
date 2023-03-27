import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async createHole(playerId: number, dto: HoleDto) {
    const hole = await this.prisma.hole.create({
      data: {
        playerId,
        ...dto,
      },
    });
    return hole;
  }

  async editHoleById(playerId: number, holeId: number, dto: HoleDto) {
    const hole = await this.prisma.hole.findUnique({
      where: {
        id: holeId,
      },
    });

    if (!hole || hole.playerId !== playerId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.hole.update({
      where: {
        id: holeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteHoleById(playerId: number, holeId: number) {
    const hole = await this.prisma.hole.findUnique({
      where: {
        id: holeId,
      },
    });

    if (!hole || hole.playerId !== playerId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.hole.delete({
      where: {
        id: holeId,
      },
    });
  }
}
