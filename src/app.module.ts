import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'

@Module({
  imports: [PsychologistModule, PatientModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
