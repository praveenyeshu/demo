import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsViewComponent } from './view/view.component';

import { AgGridModule } from 'ag-grid-angular';

import {MatCardModule} from '@angular/material/card';
import { RestaurantsAddComponent } from './add/add.component';

const COMPONENTS = [RestaurantsViewComponent, RestaurantsAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    RestaurantsRoutingModule,
    AgGridModule.withComponents([]),
    MatCardModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RestaurantsModule { }
