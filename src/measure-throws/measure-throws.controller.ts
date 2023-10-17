import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUserId } from '../auth/decorator/get-user-id.decorator';
import { MeasuredThrowsDto, EditThrowDto } from './dto';
import { MeasureThrowsService } from './measure-throws.service';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Measure Throws')
@UseGuards(JwtGuard)
@Controller('measure-throws')
export class MeasureThrowsController {
  constructor(private measureThrowsService: MeasureThrowsService) {}

  @ApiOkResponse()
  @Get()
  getMeasuredThrows(@GetUserId('id') userId: number) {
    return this.measureThrowsService.getMeasuredThrows(userId);
  }

  @ApiOkResponse()
  @Get(':id')
  getThrowsById(
    @GetUserId('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
  ) {
    return this.measureThrowsService.getThrowsById(userId, throwId);
  }
  @ApiCreatedResponse({ type: MeasuredThrowsDto })
  @Post()
  createMeasuredThrow(
    @GetUserId('id') userId: number,
    @Body() dto: MeasuredThrowsDto,
  ) {
    // console.log(dto);
    return this.measureThrowsService.createMeasuredThrow(userId, dto);
  }

  @ApiCreatedResponse({ type: MeasuredThrowsDto })
  @Post('/offline')
  getOfflineData(@GetUserId('id') userId: number, @Body() dto: any) {
    console.log('data inside of backend is: ', dto);
    return this.measureThrowsService.parseOfflineThrowData(userId, dto);
  }

  @ApiOkResponse()
  @Patch(':id')
  editThrowById(
    @GetUserId('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
    @Body() dto: EditThrowDto,
  ) {
    return this.measureThrowsService.editThrowById(userId, throwId, dto);
  }

  //   @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteThrowById(
    @GetUserId('id') userId: number,
    @Param('id', ParseIntPipe) throwId: number,
  ) {
    // console.log('id being passed in is ', throwId);
    return this.measureThrowsService.deleteThrowById(userId, throwId);
  }
}
