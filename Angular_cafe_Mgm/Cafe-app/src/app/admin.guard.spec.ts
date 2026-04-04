import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from './Service/auth.service';
import { ToastrService } from 'ngx-toastr';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let toast: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'isAdmin']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    toast = jasmine.createSpyObj('ToastrService', ['info']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toast }
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when logged in as admin', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isAdmin.and.returnValue(true);

    expect(guard.canActivate()).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(toast.info).not.toHaveBeenCalled();
  });

  it('should block access when not admin', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.isAdmin.and.returnValue(false);

    expect(guard.canActivate()).toBeFalse();
    expect(toast.info).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
