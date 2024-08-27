import { IsEmail, IsNotEmpty } from 'class-validator'

export class loginPsichologistDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
