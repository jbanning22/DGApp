import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MeasureThrowsModule } from './measure-throws/measure-throws.module';
import { RoundsModule } from './rounds/rounds.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, MeasureThrowsModule, RoundsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
