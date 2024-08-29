import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { Request, Response } from 'express'
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

  async login(user: any, @Res() res: Response) {
    const payload = { email: user.email, sub: user.id, role: user.role }

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    })

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    })

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      // expire in 1 minute
      expires: new Date(Date.now() + 900000),
    })

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 604800000), // 7 days
    })

    return res.send({ access_token, refresh_token })
  }

  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token']

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found')
    }

    try {
      // Verify and decode the refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      })

      // Generate new access token
      const payload = {
        email: decoded.email,
        sub: decoded.sub,
        role: decoded.role,
      }
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      })

      // Set new cookie with access token
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 900000), // 15 minutes
      })

      return res.send({ access_token: newAccessToken })
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
