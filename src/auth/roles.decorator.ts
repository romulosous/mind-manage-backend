import { SetMetadata } from '@nestjs/common'
import { AuthType } from './enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: AuthType[]) => SetMetadata(ROLES_KEY, roles)
