import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { loginPatientDto } from 'src/patient/dto/login-patient'
import { loginPsichologistDto } from 'src/psychologist/dto/login-psichologist.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/psichologist')
  async loginPsichologist(@Body() loginDtoPsi: loginPsichologistDto) {
    const psicologo = await this.authService.validateUser(
      'psichologist',
      loginDtoPsi.email,
      loginDtoPsi.password,
    )

    if (!psicologo) {
      throw new UnauthorizedException('INVALID_CREDENTIALS')
    }

    return this.authService.login(psicologo)
  }

  @Post('login/patient')
  async loginPaciente(@Body() loginDtoPac: loginPatientDto) {
    const paciente = await this.authService.validateUser(
      'patient',
      loginDtoPac.email,
      loginDtoPac.password,
    )

    if (!paciente) {
      throw new UnauthorizedException('INVALID_CREDENTIALS')
    }

    return this.authService.login(paciente)
  }
}
