import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MeasureThrowsModule } from './measure-throws/measure-throws.module';
import { RoundsModule } from './rounds/rounds.module';
import { ConfigModule } from '@nestjs/config';
import { ScorecardModule } from './scorecard/scorecard.module';
import { HoleModule } from './hole/hole.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    MeasureThrowsModule,
    PrismaModule,
    RoundsModule,
    ScorecardModule,
    HoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
