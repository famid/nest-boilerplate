import { Test, TestingModule } from '@nestjs/testing';
import { BdappsSubscriptionService } from './bdapps-subscription.service';

describe('BdappsSubscriptionService', () => {
  let service: BdappsSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BdappsSubscriptionService],
    }).compile();

    service = module.get<BdappsSubscriptionService>(BdappsSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
