
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Article } from '../../shared/models/article';
import { StorageService } from '../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/v1/articles'; // URL base del backend

  private http = inject(HttpClient);
  private storageService = inject(StorageService);


  constructor() {}

  /**
   * Método para crear un artículo.
   * @param articleData Datos del artículo a crear.
   * @returns Observable con la respuesta del servidor.
   */
  createArticle(articleData: Article): Observable<any> {
    const token = this.storageService.getToken(); // Obtiene el token del usuario autenticado
    const creatorId = this.storageService.getCreatorId(); // Obtiene el ID del creador autenticado

    if (!creatorId || !token) {
      throw new Error('No se encontró el token o el ID del creador.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    // Agregar el `creatorId` al cuerpo de la solicitud
    const articlePayload = {
      ...articleData,
      creatorId: creatorId, // Agrega el ID del creador automáticamente
      type: articleData.type || 'defaultType', // Valores predeterminados
      status: articleData.status !== undefined ? articleData.status : true,
      numReads: articleData.numReads || 0,
      numComments: articleData.numComments || 0,
      numLikes: articleData.numLikes || 0,
    };

    // Enviar la solicitud al backend
    return this.http.post(`${this.apiUrl}/create`, articlePayload, { headers });
  }

  /**
   * Método para obtener todos los artículos.
   * @returns Observable con la lista de artículos.
   */
  getAllArticles(): Observable<Article[]> {
    const token = this.storageService.getToken(); // Obtiene el token del usuario autenticado

    if (!token) {
      throw new Error('No se encontró el token.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this.http.get<Article[]>(`${this.apiUrl}/seeArticle`, { headers });
  }

  /**
   * Método para obtener un artículo por su ID.
   * @param id ID del artículo.
   * @returns Observable con los detalles del artículo.
   */
  getArticle(id: number): Observable<Article> {
    const token = this.storageService.getToken(); // Obtiene el token del usuario autenticado

    if (!token) {
      throw new Error('No se encontró el token.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this.http.get<Article>(`${this.apiUrl}/${id}`, { headers });
  }
  /**
   * Método para filtrar artículos por tipo (categoría).
   * @param type Tipo (categoría) de los artículos.
   * @returns Observable con la lista de artículos filtrados por tipo.
   */
  filterArticlesByType(type: string): Observable<Article[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`, // Token manual
    });
    const params = new HttpParams().set('type', type);

    return this.http.get<Article[]>(`${this.apiUrl}/filter/type`, { headers, params });
  }
}
