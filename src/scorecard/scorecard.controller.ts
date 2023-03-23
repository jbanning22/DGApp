import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
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

  @Post()
  createScorecard(@GetUser('id') playerId: number, @Body() dto: ScorecardDto) {
    return this.scorecardService.createScorecard(playerId, dto);
  }
}
