import { Route } from '@angular/router';
import { CreateArticleComponent } from './article/article.component';
import { ReadArticleComponent } from '../../shared/components/read-article/read-article.component';

export const routes: Route[]= [
  { path: 'create-article', component: CreateArticleComponent }, 
  { path: 'article/id', component: ReadArticleComponent}
];
