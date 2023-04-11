import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HomeComponent } from './home/home.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './login/login.component';

const redirectToHome = () => redirectUnauthorizedTo('/login');

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToHome,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'item/:id',
    component: ItemDetailComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToHome,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
