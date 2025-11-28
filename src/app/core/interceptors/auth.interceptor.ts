import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service'

const PUBLIC_ENDPOINTS = [
  'api/login'
]

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const requestUrl = req.url;

  const isPublicRoute = PUBLIC_ENDPOINTS.some(endpoint => requestUrl.includes(endpoint));

  if (isPublicRoute || !token) {
    return next(req);
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(authReq);
};
