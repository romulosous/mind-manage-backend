import { AppointmentModule } from './appointment/appointment.module'
import { AuthModule } from './auth/auth.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'
import { Module } from '@nestjs/common'
import { AnameneseModule } from './anamenese/anamenese.module'
import { SessionModule } from './session/session.module'
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PsychologistModule,
    PatientModule,
    AuthModule,
    AppointmentModule,
    AnameneseModule,
    SessionModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
