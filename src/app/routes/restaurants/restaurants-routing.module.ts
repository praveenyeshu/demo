import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsViewComponent } from './view/view.component';
import { RestaurantsAddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'view', component: RestaurantsViewComponent },
  { path: 'add', component: RestaurantsAddComponent },
  { path: 'edit/:id', component: RestaurantsAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
