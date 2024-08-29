import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies.authToken // Acessar o token do cookie

    if (!token) {
      return false
    }

    try {
      // Verificar e decodificar o token
      const decoded = this.jwtService.verify(token)
      request.user = decoded
      return true
    } catch (err) {
      return false
    }
  }
}
