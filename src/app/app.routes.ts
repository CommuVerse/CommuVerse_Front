
import { Route } from '@angular/router';
import { CreateArticleComponent } from './pages/creator/article/article.component';
import { ExitoComponent } from './pages/exito/exito.component';
import { ArticleListComponent } from './shared/components/article-list/article-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a la lista de artículos como predeterminada
  { path: 'see-articles', component: ArticleListComponent }, // Ruta para la lista de artículos
  {path: 'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: 'creator/crear-articulo', component: CreateArticleComponent }, // Ruta para crear artículo
  { path: 'ruta-de-exito', component: ExitoComponent }, // Ruta para la página de éxito
  { path: '**', redirectTo: '/articles' }, // Redirige a la lista de artículos en caso de error 404
];
