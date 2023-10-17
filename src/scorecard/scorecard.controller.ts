import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Post,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUserId } from '../auth/decorator/get-user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ScorecardService } from './scorecard.service';
import { ScorecardDto } from './dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Scorecard')
@UseGuards(JwtGuard)
@Controller('scorecard')
export class ScorecardController {
  constructor(private scorecardService: ScorecardService) {}

  @ApiOkResponse()
  @Get()
  getScorecards(@GetUserId('id') playerId: number) {
    return this.scorecardService.getScorecards(playerId);
  }

  @ApiOkResponse()
  @Get(':id')
  getScorecardById(
    @GetUserId('id') playerId: number,
    @Param('id', ParseIntPipe) scorecardId: number,
  ) {
    return this.scorecardService.getScorecardById(playerId, scorecardId);
  }

  @ApiCreatedResponse({ type: ScorecardDto })
  @Post()
  createScorecard(
    @GetUserId('id') playerId: number,
    @Body() dto: ScorecardDto,
  ) {
    // console.log('data inside of backend is: ', dto);
    return this.scorecardService.createScorecard(playerId, dto);
  }

  @ApiCreatedResponse({ type: ScorecardDto })
  @Post('/offline')
  getOfflineData(@GetUserId('id') playerId: number, @Body() dto: any) {
    // console.log('data inside of backend is: ', dto);
    this.scorecardService.parseOfflineData(playerId, dto);
    return playerId;
  }

  @ApiOkResponse()
  @Patch(':id')
  editScorecardById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ScorecardDto,
    @GetUserId('id') playerId: number,
  ) {
    return this.scorecardService.editScorecardById(id, dto, playerId);
  }

  @Delete(':id')
  deleteThrowById(
    @GetUserId('id') playerId: number,
    @Param('id', ParseIntPipe) scorecardId: number,
  ) {
    return this.scorecardService.deleteScorecardById(playerId, scorecardId);
  }
}
