import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth-response.model'; // Modelo de autenticación

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private authKey = 'authData'; // Clave para almacenar los datos de autenticación

  /**
   * Guarda los datos de autenticación en el almacenamiento local.
   * @param authData Datos de autenticación recibidos del backend.
   */
  setAuthData(authData: AuthResponse): void {
    localStorage.setItem(this.authKey, JSON.stringify(authData));
  }
  
  /**
   * Obtiene los datos de autenticación almacenados.
   * @returns Objeto con los datos de autenticación o null si no existe.
   */
  getAuthData(): AuthResponse | null {
    try {
      const authData = localStorage.getItem(this.authKey);
      if (authData) {
        return JSON.parse(authData);
      }
    } catch (e) {
      console.error('Error al parsear los datos de autenticación', e);
      this.clearAuthData();  // Limpiar datos si hay error
    }
    return null;
  }

  /**
   * Obtiene el token almacenado.
   * @returns Token JWT o null si no existe.
   */
  getToken(): string | null {
    const authData = this.getAuthData();
    return authData ? authData.token : null;
  }

  /**
   * Obtiene el ID del creador autenticado.
   * @returns ID del creador o null si no existe.
   */
  getCreatorId(): number | null {
    const authData = this.getAuthData();
    return authData ? authData.id : null;
  }

  /**
   * Obtiene el nickname del creador autenticado.
   * @returns Nickname del creador o null si no existe.
   */
  getCreatorNickName(): string | null {
    const authData = this.getAuthData();
    return authData ? authData.nickName : null;
  }

  /**
   * Limpia los datos de autenticación del almacenamiento local.
   */
  clearAuthData(): void {
    localStorage.removeItem(this.authKey);
  }
}
