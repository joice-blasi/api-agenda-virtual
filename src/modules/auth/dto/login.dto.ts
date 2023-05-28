import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
  @ApiProperty({
    description: "E-mail para login",
    type: String,
    default: "maria@email.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: "Senha para login",
    type: String,
    default: "123456"
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
