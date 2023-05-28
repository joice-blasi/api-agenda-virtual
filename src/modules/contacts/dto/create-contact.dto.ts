import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateContactDto {
  @ApiProperty({
    description: "Nome do contato",
    type: String,
    default: "João Martins"
  })
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: "E-mail do contato",
    type: String,
    default: "joao@email.com"
  })
  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: "Telefone do contato",
    type: String,
    default: "99666-8888"
  })
  @IsString()
  @IsNotEmpty()
  telephone: string
}