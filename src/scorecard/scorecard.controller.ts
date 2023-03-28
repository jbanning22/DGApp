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
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ScorecardService } from './scorecard.service';
import { ScorecardDto } from './dto';

@UseGuards(JwtGuard)
@Controller('scorecard')
export class ScorecardController {
  constructor(private scorecardService: ScorecardService) {}

  @Get()
  getScorecards(@GetUser('id') playerId: number) {
    return this.scorecardService.getScorecards(playerId);
  }

  @Get(':id')
  getScorecardById(
    @GetUser('id') playerId: number,
    @Param('id', ParseIntPipe) scorecardId: number,
  ) {
    return this.scorecardService.getScorecardById(playerId, scorecardId);
  }

  @Post()
  createScorecard(@GetUser('id') playerId: number, @Body() dto: ScorecardDto) {
    console.log(dto);
    return this.scorecardService.createScorecard(playerId, dto);
  }

  @Patch(':id')
  editScorecardById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ScorecardDto,
    @GetUser('id') playerId: number,
  ) {
    return this.scorecardService.editScorecardById(id, dto, playerId);
  }

  @Delete(':id')
  deleteThrowById(
    @GetUser('id') playerId: number,
    @Param('id', ParseIntPipe) scorecardId: number,
  ) {
    return this.scorecardService.deleteScorecardById(playerId, scorecardId);
  }
}
