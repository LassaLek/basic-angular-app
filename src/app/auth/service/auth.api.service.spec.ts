import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth.api.service';

describe('Auth.ApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
