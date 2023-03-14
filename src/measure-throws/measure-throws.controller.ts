import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { MeasuredThrowsDto, EditThrowById } from './dto';
import { MeasureThrowsService } from './measure-throws.service';

@UseGuards(JwtGuard)
@Controller('measure-throws')
export class MeasureThrowsController {
  constructor(private measureThrowsService: MeasureThrowsService) {}

  @Get()
  getMeasuredThrows(@GetUser('id') userId: number) {
    console.log('userId in controller:', userId);
    return this.measureThrowsService.getMeasuredThrows(userId);
  }

  @Get(':id')
  getThrowssById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
  ) {
    return this.measureThrowsService.getThrowsById(userId, throwId);
  }
  @Post()
  createMeasuredThrow(
    @GetUser('id') userId: number,
    @Body() dto: MeasuredThrowsDto,
  ) {
    console.log(dto);
    return this.measureThrowsService.createMeasuredThrow(userId, dto);
  }

  @Patch(':id')
  editThrowById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
    @Body() dto: EditThrowById,
  ) {
    return this.measureThrowsService.editThrowById(userId, throwId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteThrowById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
  ) {
    return this.measureThrowsService.deleteThrowById(userId, throwId);
  }
}
