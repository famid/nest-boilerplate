import { IsString, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  referenceNo: string;

  @IsString()
  @MinLength(4)
  otp: string;
}
