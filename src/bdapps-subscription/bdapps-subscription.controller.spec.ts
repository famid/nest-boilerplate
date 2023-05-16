import { Test, TestingModule } from '@nestjs/testing';
import { BdappsSubscriptionController } from './bdapps-subscription.controller';

describe('BdappsSubscriptionController', () => {
  let controller: BdappsSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BdappsSubscriptionController],
    }).compile();

    controller = module.get<BdappsSubscriptionController>(BdappsSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
