import { Route } from '@angular/router';
import { CreateArticleComponent } from './pages/creator/article/article.component';
import { ExitoComponent } from './pages/exito/exito.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/creator/crear-articulo', pathMatch: 'full' },
  { path: 'creator/crear-articulo', component: CreateArticleComponent },
  { path: 'ruta-de-exito', component: ExitoComponent }, // Ruta para "ruta-de-exito"
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/home' } // Ruta comodín para errores 404
];
