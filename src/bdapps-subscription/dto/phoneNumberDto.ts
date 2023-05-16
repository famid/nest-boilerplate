import { IsPhoneNumber } from 'class-validator';

export class PhoneNumberDto {
  @IsPhoneNumber('BD')
  phoneNumber: string;
}
