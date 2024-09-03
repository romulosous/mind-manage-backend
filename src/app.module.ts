import { AppointmentModule } from './appointment/appointment.module'
import { AuthModule } from './auth/auth.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'
import { ReportModule } from './report/report.module'
import { Module } from '@nestjs/common'
import { AnameneseModule } from './anamenese/anamenese.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    PsychologistModule,
    PatientModule,
    AuthModule,
    AppointmentModule,
    ReportModule,
    AnameneseModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
