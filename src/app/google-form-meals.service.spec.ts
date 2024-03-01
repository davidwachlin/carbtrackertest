import { TestBed } from '@angular/core/testing';

import { GoogleFormMealsService } from './google-form-meals.service';

describe('GoogleFormMealsService', () => {
  let service: GoogleFormMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleFormMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
