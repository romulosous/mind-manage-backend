import { Module } from '@nestjs/common'

import { PsychologistModule } from './psychologist/psychologist.module'

@Module({
  imports: [PsychologistModule],
})
export class AppModule {}
