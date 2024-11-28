import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseURL = `${environment.baseURL}/users`; // Ruta base del backend

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() {}

  /**
   * Envía las credenciales del usuario para autenticación.
   * Guarda el token, el id del creador, y el nickname en `StorageService`.
   */
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap((response) => {
        // Guarda los datos de autenticación en almacenamiento local
        this.storageService.setAuthData({
          token: response.token,
          id: response.id,  // Guarda el id del creador
          nickName: response.nickName,
        });
      })
    );
  }

  /**
   * Cierra sesión y limpia los datos almacenados.
   */
  logout(): void {
    this.storageService.clearAuthData();
  }

  /**
   * Verifica si el usuario está autenticado.
   */
  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  /**
   * Obtiene el ID del creador autenticado.
   * @returns ID del creador o null si no está autenticado.
   */
  getCreatorId(): number | null {
    return this.storageService.getCreatorId();
  }

  /**
   * Obtiene el token de autenticación almacenado.
   * @returns Token JWT o null si no está autenticado.
   */
  getToken(): string | null {
    return this.storageService.getToken();
  }

  /**
   * Obtiene el nickname del creador autenticado.
   * @returns Nickname del creador o null si no está autenticado.
   */
  getCreatorNickName(): string | null {
    return this.storageService.getCreatorNickName();
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }
}
