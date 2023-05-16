import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BdappsSubscriptionModule } from './bdapps-subscription/bdapps-subscription.module';

@Module({
  imports: [DatabaseModule, BdappsSubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
