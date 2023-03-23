import {
  Controller,
  Get,
  UseGuards,
  Body,
  Param,
  Post,
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
    @Param('id', ParseIntPipe) throwId: number,
  ) {
    return this.scorecardService.getScorecardById(playerId, throwId);
  }

  @Post()
  createScorecard(@GetUser('id') playerId: number, @Body() dto: ScorecardDto) {
    return this.scorecardService.createScorecard(playerId, dto);
  }

  @Patch(':id')
  editScorecardById(
    @GetUser('id') playerId: number,
    @Param('id', ParseIntPipe) scorecardId: number,
    @Body() dto: ScorecardDto,
  ) {
    return this.scorecardService.editScorecardById(playerId, scorecardId, dto);
  }
}
