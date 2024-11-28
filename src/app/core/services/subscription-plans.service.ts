import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../../shared/models/subscription-plans';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPlanService {
  private apiUrl = 'http://localhost:8080/api/v1/subscription-plans'; // URL base del backend
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGZWxpcGU0IiwiaWF0IjoxNzMyNzcyMTg1LCJleHAiOjE3MzI4MDgxODV9.bJXQFCoAES6Vf1AZW9rHtNlfB2utpQpPqPGFno2u1C2682ibc5gRHJhQNmxtsSAYaFrWkVZps9_5dwGPyYE0hA'; // Token JWT (reemplazar con el correcto o gestionarlo dinámicamente)

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo plan de suscripción.
   * @param plan Datos del plan de suscripción.
   * @returns Observable con la respuesta del servidor.
   */
  createPlan(plan: SubscriptionPlan): Observable<SubscriptionPlan> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`, // Token manual
    });

    return this.http.post<SubscriptionPlan>(`${this.apiUrl}`, plan, { headers });
  }

  /**
   * Obtiene todos los planes de suscripción del creador actual.
   * @param userId ID del usuario creador.
   * @returns Observable con la lista de planes.
   */
  getPlansByCreator(userId: number): Observable<SubscriptionPlan[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`, // Token manual
    });

    return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/${userId}`, { headers });
  }

  /**
   * Modifica un plan de suscripción existente.
   * @param id ID del plan de suscripción a modificar.
   * @param plan Datos actualizados del plan.
   * @returns Observable con el plan actualizado.
   */
  updatePlan(id: number, plan: SubscriptionPlan): Observable<SubscriptionPlan> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.put<SubscriptionPlan>(`${this.apiUrl}/${id}`, plan, { headers });
  }

  /**
   * Elimina un plan de suscripción por su ID.
   * @param id ID del plan de suscripción a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  deletePlan(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
