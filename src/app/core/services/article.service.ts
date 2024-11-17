import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../shared/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/v1/articles';


  constructor(private http: HttpClient) {}

  createArticle(articleData: Article): Observable<any> {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQaWVycmUxMiIsImlhdCI6MTczMTgwNDYyOSwiZXhwIjoxNzMxODQwNjI5fQ.dRzcUZQGG1l7wGgalLdqFggfB5i48CsnzWs1DWo5dOJScVy4XK5lnBN4LGet--RlFnPyGClWUzQrnRh0TDNCbg';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    articleData.type = articleData.type || 'defaultType'; // Valor predeterminado para "type" si no está definido
    articleData.status = articleData.status !== undefined ? articleData.status : true;
    articleData.numReads = articleData.numReads || 0;
    articleData.numComments = articleData.numComments || 0;
    articleData.numLikes = articleData.numLikes || 0;

    return this.http.post(`${this.apiUrl}/create`, articleData, { headers });
  }
}
