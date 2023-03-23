import { Module } from '@nestjs/common';
import { HoleController } from './hole.controller';
import { HoleService } from './hole.service';

@Module({
  controllers: [HoleController],
  providers: [HoleService]
})
export class HoleModule {}
