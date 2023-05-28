import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @ApiProperty({
    description: "Nome do usuário",
    type: String,
    default: "Maria Silva"
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "E-mail do usuário",
    type: String,
    default: "maria@email.com"
  })
  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
    default: "123456"
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform']
  })
  password: string

  @ApiProperty({
    description: "Telefone do usuário",
    type: String,
    default: "99888-7777"
  })
  @IsString()
  @IsNotEmpty()
  telephone: string
}
