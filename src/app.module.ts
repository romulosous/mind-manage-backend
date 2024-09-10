import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { AnameneseModule } from './anamenese/anamenese.module'
import { AppointmentModule } from './appointment/appointment.module'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'
import { SessionModule } from './session/session.module'

@Module({
  imports: [
    PsychologistModule,
    PatientModule,
    AuthModule,
    AppointmentModule,
    AnameneseModule,
    SessionModule,
    EmailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
