import { IsPhoneNumber } from 'class-validator';

export class MakeSubscriptionDto {
  @IsPhoneNumber('BD')
  phoneNumber: string;
}
