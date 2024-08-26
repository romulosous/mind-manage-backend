import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { PsychologistService } from 'src/psychologist/psychologist.service'

@Injectable()
export class AuthService {
  private userType: string
  constructor(
    private psychologistService: PsychologistService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    let user = await this.psychologistService.findByEmail(email)
    this.userType = 'psychologist'

    // if (!user) {
    //   user = await this.patientService.findByEmail(email)
    //   this.userType = 'patient'
    // }

    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: { email: string; id: string; type: string }) {
    const payload = { email: user.email, sub: user.id, type: this.userType }
    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS256',
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
    }
  }
}
