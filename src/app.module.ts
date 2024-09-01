import { AppointmentModule } from './appointment/appointment.module'
import { AuthModule } from './auth/auth.module'
import { PatientModule } from './patient/patient.module'
import { PsychologistModule } from './psychologist/psychologist.module'
import { ReportModule } from './report/report.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    PsychologistModule,
    PatientModule,
    AuthModule,
    AppointmentModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
