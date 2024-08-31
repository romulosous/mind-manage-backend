import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'
import { AppointmentModule } from './appointment/appointment.module'
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [PsychologistModule, PatientModule, AuthModule, AppointmentModule, ActivityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
