import { TestBed, inject } from '@angular/core/testing';

import { FormVerifyService } from './form-verify.service';

describe('FormVerifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormVerifyService]
    });
  });

  it('should be created', inject([FormVerifyService], (service: FormVerifyService) => {
    expect(service).toBeTruthy();
  }));
});
