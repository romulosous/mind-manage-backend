import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login-dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      email,
      password,
    )

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS')
    }

    return this.authService.login(user, res)
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res)
  }
}
