export interface AuthResponse {
  token: string;    // Token JWT generado por el backend
  nickName: string; // Nickname del usuario autenticado
  id:number;
}
