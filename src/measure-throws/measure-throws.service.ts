import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MeasuredThrowsDto, EditThrowDto } from './dto';
// import { GetUser } from 'src/auth/decorator';

@Injectable()
export class MeasureThrowsService {
  constructor(private prisma: PrismaService) {}

  getMeasuredThrows(userId: number) {
    return this.prisma.measuredThrow.findMany({
      where: {
        userId,
      },
    });
  }

  getThrowsById(userId: number, throwId: number) {
    return this.prisma.measuredThrow.findFirst({
      where: {
        id: throwId,
        userId,
      },
    });
  }

  async createMeasuredThrow(userId: number, dto: MeasuredThrowsDto) {
    const measuredThrow = await this.prisma.measuredThrow.create({
      data: {
        userId,
        ...dto,
      },
    });
    return measuredThrow;
  }

  async parseOfflineThrowData(userId: number, dto: any) {
    const throws = dto.userData.throws;
    const createdThrows = [];

    for (const throwData of throws) {
      const mappedData: MeasuredThrowsDto = {
        disc: throwData.disc,
        throwtype: throwData.throwtype,
        distance: throwData.distance.toString(),
        color: throwData.color,
      };

      const throwRecord = await this.prisma.measuredThrow.create({
        data: {
          userId,
          ...mappedData,
        },
      });

      createdThrows.push(throwRecord);
    }

    return createdThrows;
  }

  async editThrowById(userId: number, throwId: number, dto: EditThrowDto) {
    const measuredThrow = await this.prisma.measuredThrow.findUnique({
      where: {
        id: throwId,
      },
    });

    if (!measuredThrow || measuredThrow.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    return this.prisma.measuredThrow.update({
      where: {
        id: throwId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteThrowById(userId: number, throwId: number) {
    const measuredThrow = await this.prisma.measuredThrow.findUnique({
      where: {
        id: throwId,
      },
    });

    if (!measuredThrow || measuredThrow.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.measuredThrow.delete({
      where: {
        id: throwId,
      },
    });
    const throws = await this.prisma.measuredThrow.findMany({
      where: {
        userId,
      },
    });
    return { throws: throws };
  }
}
