import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { PatientService } from 'src/patient/patient.service'
import { PsychologistService } from 'src/psychologist/psychologist.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly psychologistService: PsychologistService,
    private readonly patientService: PatientService,
  ) {}

  async validateUser(
    role: string,
    email: string,
    password: string,
  ): Promise<any> {
    let user
    if (role === 'psichologist') {
      user = await this.psychologistService.findByEmail(email)
    } else if (role === 'patient') {
      user = await this.patientService.findByEmail(email)
    }

    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user
      return { ...result, role }
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
