import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { Comment } from '../../shared/models/comment';
import { map } from 'rxjs/operators'; // Importar map para transformar los datos si es necesario

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.baseURL}/comments`;
  
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEb24gTWVzc2kiLCJpYXQiOjE3MzI3NjMxNzUsImV4cCI6MTczMjc5OTE3NX0.HET0qOTuWcCH4ASd4u90fJroWHs_PrXqWNXWTwP9ZuK9cBHkzPgWYGtcYwDtFZReemIU__zU1qsJkg2EaelHgg';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  }

  // Obtener comentarios por artículo
  getCommentsByArticle(articleId: number): Observable<Comment[]> {
    return this.http.get(`${this.apiUrl}/article/${articleId}`, { headers: this.getHeaders(), responseType: 'arraybuffer' })
      .pipe(
        map((response: ArrayBuffer) => {
          const text = new TextDecoder().decode(response);
          return JSON.parse(text) as Comment[];
        })
      );
  }

  // Agregar un comentario
  addComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/add`, comment, { headers: this.getHeaders() });
  }

  // Editar un comentario
  editComment(commentId: number, comment: any): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${commentId}/edit`, comment, { headers: this.getHeaders() });
  }

  // Eliminar un comentario
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}/delete`, { headers: this.getHeaders() });
  }
}
