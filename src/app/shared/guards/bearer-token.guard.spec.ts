import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bearerTokenGuard } from './bearer-token.guard';

describe('bearerTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bearerTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
