import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../shared/models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/v1/articles'; // URL base del backend
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQaWVycmUxMiIsImlhdCI6MTczMjE5NjY1MiwiZXhwIjoxNzMyMjMyNjUyfQ.2MsFPLFls7wwik_oxpUEG0THdPik4QCZtTOehDODHIkRsknZ8rukl8LbraXaMQywXQLt447vTBXKvPSRd8ikUg';

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
}
