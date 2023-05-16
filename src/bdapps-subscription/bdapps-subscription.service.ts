import { Injectable } from '@nestjs/common';
import { User, UserModel } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUserDto';
import { MakeSubscriptionDto } from './dto/makeSubscriptionDto';
import { ApiService } from './api.service';

interface SubscriberStatusRequest {
  subscriberId: string;
  action: '0' | '1';
}

interface SubscriberStatusResponse {
  version: string;
  statusCode: string;
  statusDetail: string;
  subscriptionStatus: string;
}
@Injectable()
export class BdappsSubscriptionService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<User>,
    private readonly apiService: ApiService,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<User> {
    const createUserResponse = new this.userModel(newUser);
    return createUserResponse.save();
  }

  // This service handles user subscription process(subscription/unsubscription)
  public async createSubscription(
    subscription: MakeSubscriptionDto,
  ): Promise<
    | { success: boolean; data: SubscriberStatusResponse }
    | { success: boolean; error: string }
  > {
    const endpoint = 'subscription/send';
    const subscriberId = this.formatSubscriberId(subscription.phoneNumber);
    const action: '0' | '1' = '0';

    const requestBody: SubscriberStatusRequest = {
      subscriberId,
      action,
    };

    return this.apiService.makeApiCall<
      SubscriberStatusRequest,
      SubscriberStatusResponse
    >(endpoint, requestBody);
  }

  // This service returns the number of registered subscribers
  public async totalSubscribeUsers() {
    const endpoint = 'subscription/query-base';

    return this.apiService.makeApiCall(endpoint, {});
  }

  // is service returns the user subscription status(unregistered,registered)
  public async userSubscriptionStatus(phoneNumber: string) {
    const endpoint = 'subscription/getStatus';
    const subscriberId = this.formatSubscriberId(phoneNumber);
    const requestBody = { subscriberId };

    return this.apiService.makeApiCall(endpoint, requestBody);
  }

  // This service sends notifications to the users
  public async sendNotificationToUser(phoneNumber: string) {
    const endpoint = 'subscription/getStatus';
    const subscriberId = this.formatSubscriberId(phoneNumber);
    const requestBody = {
      subscriberId,
      version: '1.0',
      frequency: 'monthly',
      status: 'REGISTERED',
    };

    return this.apiService.makeApiCall(endpoint, requestBody);
  }

  // This service is used by the developer to request an OTP for a subscriber's MSISDN.
  public async requestForSendOtp(phoneNumber: string) {
    const endpoint = 'otp/request';
    const subscriberId = this.formatSubscriberId(phoneNumber);
    const requestBody = { subscriberId };

    return this.apiService.makeApiCall(endpoint, requestBody);
  }

  /*
    This service is used by the developer to verify an OTP entered by a
    subscriber into the application. Upon a successful verification the subscription
    process of bdapps will be activated.
   */
  public async verifyOtp(referenceNo: string, otp: string) {
    const endpoint = 'otp/verify';
    // const requestBody = { referenceNo, otp };
    const requestBody = { referenceNo: '213561321321613', otp: '123564' };

    return this.apiService.makeApiCall(endpoint, requestBody);
  }
  private formatSubscriberId(phoneNumber: string, useTelPrefix = true): string {
    if (useTelPrefix) {
      return `tel:${phoneNumber}`;
    }
    return phoneNumber;
  }
}
