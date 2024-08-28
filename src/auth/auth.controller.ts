import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login-dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/user')
  async loginUser(@Body() loginDto: LoginDto, res: Response) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    )

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS')
    }

    return this.authService.login(user, res)
  }
}
