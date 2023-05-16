import { Module } from '@nestjs/common';
import { BdappsSubscriptionController } from './bdapps-subscription.controller';
import { BdappsSubscriptionService } from './bdapps-subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/user.schema';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [BdappsSubscriptionController],
  providers: [BdappsSubscriptionService, ApiService],
})
export class BdappsSubscriptionModule {}
