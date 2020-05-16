import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantsViewComponent } from './view/view.component';
import { RestaurantsAddComponent } from './add/add.component';
import { RestaurantsImportRestaurantsComponent } from './import-restaurants/import-restaurants.component';

const routes: Routes = [
  { path: 'view', component: RestaurantsViewComponent },
  { path: 'add', component: RestaurantsAddComponent },
  { path: 'edit/:id', component: RestaurantsAddComponent },
  { path: 'import', component: RestaurantsImportRestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
