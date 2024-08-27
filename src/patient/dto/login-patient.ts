import { IsEmail, IsNotEmpty } from 'class-validator'

export class loginPatientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
