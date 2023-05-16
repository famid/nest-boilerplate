import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './schemas/user.schema';
import { BdappsSubscriptionService } from './bdapps-subscription.service';
import { MakeSubscriptionDto } from './dto/makeSubscriptionDto';
import { PhoneNumberDto } from './dto/phoneNumberDto';
import { VerifyOtpDto } from './dto/verifyOtpDto';

interface SubscriberStatusResponse {
  version: string;
  statusCode: string;
  statusDetail: string;
  subscriptionStatus: string;
}
@Controller('bdapps-subscription')
export class BdappsSubscriptionController {
  constructor(
    private readonly subscriptionService: BdappsSubscriptionService,
  ) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.subscriptionService.createUser(createUserDto);
  }

  @Post('subscribe')
  async makeSubscription(
    @Body() makeSubscriptionDto: MakeSubscriptionDto,
  ): Promise<
    | { success: boolean; data: SubscriberStatusResponse }
    | { success: boolean; error: string }
  > {
    return this.subscriptionService.createSubscription(makeSubscriptionDto);
  }
  @Post('user/subscribe/status')
  async userSubscriptionStatus(@Body() request: PhoneNumberDto) {
    return this.subscriptionService.userSubscriptionStatus(request.phoneNumber);
  }

  @Post('send/notification')
  async sendNotificationToUser(@Body() request: PhoneNumberDto) {
    return this.subscriptionService.sendNotificationToUser(request.phoneNumber);
  }
  @Post('send/otp')
  async requestForSendOtp(@Body() request: PhoneNumberDto) {
    return this.subscriptionService.requestForSendOtp(request.phoneNumber);
  }

  @Post('verify/otp')
  async verifyOtp(@Body() request: VerifyOtpDto) {
    return this.subscriptionService.verifyOtp(request.referenceNo, request.otp);
  }
}
