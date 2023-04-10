import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ApiService } from './services/api.service';

const routes: Routes = [
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'item/:id',
    component: ItemDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
