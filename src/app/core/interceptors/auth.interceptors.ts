import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService); // Injecta el servicio para obtener el token
  const token = storageService.getToken();

  if (token) {
    // Clona la solicitud para agregar el token en las cabeceras
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req); // Si no hay token, continúa con la solicitud original
};
