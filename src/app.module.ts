import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { PsychologistModule } from './psychologist/psychologist.module'

@Module({
  imports: [PsychologistModule, AuthModule],
  controllers: [AppController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
