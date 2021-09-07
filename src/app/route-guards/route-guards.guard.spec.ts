import { TestBed } from '@angular/core/testing';

import { RouteGuardsGuard } from './route-guards.guard';

describe('RouteGuardsGuard', () => {
  let guard: RouteGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
