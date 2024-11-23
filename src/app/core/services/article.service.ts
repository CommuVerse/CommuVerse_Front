import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../shared/models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/v1/articles'; // URL base del backend
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQaWVycmUxMiIsImlhdCI6MTczMjM4MDE2OSwiZXhwIjoxNzMyNDE2MTY5fQ.LmPRZyMympjjcAZCD4b3Kp2BpORiKjGjj8w0kEcEQDK4HKqRx0BUn5At0T9Nfb2dvYQY5-sCovqPy3XfiIgUYg';

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
}
