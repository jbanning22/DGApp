import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { HoleService } from './hole.service';
import { HoleDto } from './dto';

@UseGuards(JwtGuard)
@Controller('hole')
export class HoleController {
  constructor(private holeService: HoleService) {}

  @Get()
  getHoles(@GetUser('id') playerId: number) {
    return this.holeService.getHoles(playerId);
  }

  @Get(':id')
  getHoleById(
    @GetUser('id') playerId: number,
    @Param('id', ParseIntPipe) holeId: number,
  ) {
    return this.holeService.getHoleById(playerId, holeId);
  }

  @Post(':scorecardId')
  createHole(
    @GetUser('id') playerId: number,
    @Body() dto: HoleDto,
    @Param('scorecardId', ParseIntPipe) scorecardId: number,
  ) {
    return this.holeService.createHole(playerId, dto, scorecardId);
  }
}
