import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  name: string

  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform']
  })
  password: string

  @IsString()
  @IsNotEmpty()
  telephone: string
}
