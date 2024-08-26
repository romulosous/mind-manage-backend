import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from './auth/auth.service'
import { Public } from './auth/isPublic.decorator'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
