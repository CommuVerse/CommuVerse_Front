import { Route } from '@angular/router';
import { CreateArticleComponent } from './article/article.component';
import { ReadArticleComponent } from '../../shared/components/read-article/read-article.component';
import { CreateSubscriptionPlanComponent } from './create-subscription-plans/create-subscription-plans.component';
//import { EditSubscriptionPlanComponent } from './create-subscription-plan/edit-subscription-plan.component';
//import { SubscriptionPlanListComponent } from './create-subscription-plan/subscription-plan-list.component';

export const routes: Route[] = [
  { path: 'create-article', component: CreateArticleComponent },
  { path: 'article/id', component: ReadArticleComponent },
  { path: 'create-subscription-plan', component: CreateSubscriptionPlanComponent }, // Crear un nuevo plan
 // { path: 'edit-subscription-plan/:id', component: EditSubscriptionPlanComponent }, // Editar un plan existente
  //{ path: 'my-subscription-plans', component: SubscriptionPlanListComponent }, // Ver lista de planes creados por el usuario
];
