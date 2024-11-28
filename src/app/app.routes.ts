import { Route } from '@angular/router';
import { CreateArticleComponent } from './pages/creator/article/article.component';
import { ExitoComponent } from './pages/exito/exito.component';
import { ArticleListComponent } from './shared/components/article-list/article-list.component';
import { ReadArticleComponent } from './shared/components/read-article/read-article.component';
import { LoginComponent } from './pages/auth/login/login.component';
//import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login como predeterminada
  { path: 'login', component: LoginComponent }, // Ruta para iniciar sesión
  //{ path: 'register', component: RegisterComponent }, // Ruta para registrarse
  { path: 'see-articles', component: ArticleListComponent }, // Ruta para la lista de artículos
  { path: 'article/:id', component: ReadArticleComponent }, // Ruta para ver un artículo
  { path: 'creator/crear-articulo', component: CreateArticleComponent }, // Ruta para crear un artículo
  { path: 'ruta-de-exito', component: ExitoComponent }, // Página de éxito
  { path: '**', redirectTo: '/login' }, // Redirige al login en caso de error 404
];
