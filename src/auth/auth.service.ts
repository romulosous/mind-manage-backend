import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { Response } from 'express'
import { PatientService } from 'src/patient/patient.service'
import { PsychologistService } from 'src/psychologist/psychologist.service'

import { AuthType } from './enum'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly psychologistService: PsychologistService,
    private readonly patientService: PatientService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const [psychologist, patient] = await Promise.all([
      this.psychologistService.findByEmail(email).catch(() => null),
      this.patientService.findByEmail(email).catch(() => null),
    ])

    let user = null
    let role: AuthType

    if (psychologist && compareSync(password, psychologist.password)) {
      user = psychologist
      role = AuthType.PSYCHOLOGIST
    } else if (patient && compareSync(password, patient.password)) {
      user = patient
      role = AuthType.PATIENT
    }

    if (user && role) {
      const { password, ...result } = user
      return { ...result, role }
    }

    return null
  }

  async login(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id, role: user.role }

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' })

    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' })

    return {
      access_token,
      refresh_token,
    }
  }
}
