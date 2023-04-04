import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUserId } from '../auth/decorator/get-user-id.decorator';
import { HoleService } from './hole.service';
import { HoleDto, PatchHoleDto } from './dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Holes')
@UseGuards(JwtGuard)
@Controller('hole')
export class HoleController {
  constructor(private holeService: HoleService) {}

  @ApiOkResponse()
  @Get()
  getHoles(@GetUserId('id') playerId: number) {
    return this.holeService.getHoles(playerId);
  }

  @ApiOkResponse()
  @Get(':id')
  getHoleById(
    @GetUserId('id') playerId: number,
    @Param('id', ParseIntPipe) holeId: number,
  ) {
    return this.holeService.getHoleById(playerId, holeId);
  }

  @ApiOkResponse()
  @Get('/holes/:id')
  getHolesByScorecardId(@Param('id', ParseIntPipe) scorecardId: number) {
    return this.holeService.getHolesByScorecardId(scorecardId);
  }

  @ApiCreatedResponse({ type: HoleDto })
  @Post()
  createHole(@GetUserId('id') playerId: number, @Body() dto: HoleDto) {
    return this.holeService.createHole(playerId, dto);
  }

  @Patch(':id')
  editHoleById(
    @GetUserId('id') playerId: number,
    @Param('id', ParseIntPipe) holeId: number,
    @Body() dto: PatchHoleDto,
  ) {
    return this.holeService.editHoleById(playerId, holeId, dto);
  }

  @Delete(':id')
  deleteHoleById(
    @GetUserId('id') playerId: number,
    @Param('id', ParseIntPipe) holeId: number,
  ) {
    return this.holeService.deleteHoleById(playerId, holeId);
  }
}
