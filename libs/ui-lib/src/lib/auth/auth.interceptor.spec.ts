import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideTestAuth } from '../../testing/provide-test-auth';
import { authInterceptor } from './auth.interceptor';

function setup(signedIn: boolean) {
  TestBed.configureTestingModule({
    providers: [
      provideTestAuth({ signedIn }),
      provideHttpClient(withInterceptors([authInterceptor])),
      provideHttpClientTesting(),
    ],
  });
  return { http: TestBed.inject(HttpClient), ctrl: TestBed.inject(HttpTestingController) };
}

describe('authInterceptor', () => {
  it('adds a bearer token when signed in', () => {
    const { http, ctrl } = setup(true);
    http.get('/api/me').subscribe();
    expect(ctrl.expectOne('/api/me').request.headers.get('Authorization')).toBe(
      'Bearer test-token',
    );
  });

  it('leaves requests alone when anonymous', () => {
    const { http, ctrl } = setup(false);
    http.get('/api/me').subscribe();
    expect(ctrl.expectOne('/api/me').request.headers.has('Authorization')).toBe(false);
  });
});
