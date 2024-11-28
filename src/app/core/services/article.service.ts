import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../shared/models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/v1/articles'; // URL base del backend
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzY2hhdmV6MSIsImlhdCI6MTczMjc1NzY2OCwiZXhwIjoxNzMyNzkzNjY4fQ.hEVSModtXAqlaTG5rbmLyILBuzw0KyIaPSqsTAxAvCNj9rLhHoPi24A-Z_HdsYZuIKuVeO3FK81vM8YIqTMVmw';

  constructor(private http: HttpClient) {}

  /**
   * Método para crear un artículo.
   * @param articleData Datos del artículo a crear.
   * @returns Observable con la respuesta del servidor.
   */
  createArticle(articleData: Article): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`, // Token manual
    });

    // Asignar valores predeterminados si no están definidos
    articleData.type = articleData.type || 'defaultType';
    articleData.status = articleData.status !== undefined ? articleData.status : true;
    articleData.numReads = articleData.numReads || 0;
    articleData.numComments = articleData.numComments || 0;
    articleData.numLikes = articleData.numLikes || 0;

    return this.http.post(`${this.apiUrl}/create`, articleData, { headers });
  }

  /**
   * Método para obtener todos los artículos.
   * @returns Observable con la lista de artículos.
   */
  getAllArticles(): Observable<Article[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`, // Token manual
    });

    return this.http.get<Article[]>(`${this.apiUrl}/seeArticle`, { headers });
  }

  /**
   * Método para obtener un artículo por su ID.
   * @param id ID del artículo.
   * @returns Observable con los detalles del artículo.
   */
  getArticle(id: number): Observable<Article> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
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
