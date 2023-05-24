import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateContactDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  name: string

  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  email: string

  @IsInt()
  @IsNotEmpty()
  telephone: number
}
