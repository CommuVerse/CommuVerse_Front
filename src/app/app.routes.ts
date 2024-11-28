
import { Route } from '@angular/router';
import { CreateArticleComponent } from './pages/creator/article/article.component';
import { ExitoComponent } from './pages/exito/exito.component';
import { ArticleListComponent } from './shared/components/article-list/article-list.component';
import { ReadArticleComponent } from './shared/components/read-article/read-article.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CreateSubscriptionPlanComponent } from './pages/creator/create-subscription-plans/create-subscription-plans.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a la lista de artículos como predeterminada
  { path: 'see-articles', component: ArticleListComponent }, // Ruta para la lista de artículos
  { path: 'article/:id', component: ReadArticleComponent },
  {path: 'creator/crear-plan-suscripcion', component:CreateSubscriptionPlanComponent},
  {path: 'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  { path: 'creator/crear-articulo', component: CreateArticleComponent }, // Ruta para crear artículo
  { path: 'ruta-de-exito', component: ExitoComponent }, // Ruta para la página de éxito
  { path: '**', redirectTo: '/home' }, // Redirige a la lista de artículos en caso de error 404
];
