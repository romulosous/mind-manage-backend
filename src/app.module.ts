import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'

@Module({
  imports: [PsychologistModule, PatientModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
