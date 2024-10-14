// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';
// import { AuthGuard } from './auth.guard';
 

// describe('authGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard] // Add AuthGuard to the providers
    });
    guard = TestBed.inject(AuthGuard); // Inject the AuthGuard instance
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
