import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma.service'
import { PsychologistService } from 'src/psychologist/psychologist.service'

import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  controllers: [],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PsychologistService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
