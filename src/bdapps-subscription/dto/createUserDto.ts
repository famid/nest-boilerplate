import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsPhoneNumber('BD') // Replace 'ZZ' with the appropriate country code
  phoneNumber: string;

  @IsOptional()
  @IsString()
  role?: string;
}
