import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MaterialModule } from '../material.module';
import { MaterialExtensionsModule } from '@ng-matero/extensions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ToastrModule } from 'ngx-toastr';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ErrorCodeComponent } from './components/error-code/error-code.component';
import { CustomStatusRenderComponent } from './components/grid/custom-status-render/custom-status-render.component';
import { CustomSnoRenderComponent } from './components/grid/custom-sno-render/custom-sno-render.component';
import { MaterialFileUploadComponent } from './components/material-file-upload/material-file-upload.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CustomActionsComponent } from './components/grid/custom-actions/custom-actions.component';
import { AgActionsRendererComponent } from './components/grid/ag-actions-renderer/ag-actions-renderer.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


const THIRD_MODULES = [
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgSelectModule,
  FormlyMaterialModule,
];
const COMPONENTS = [BreadcrumbComponent, 
    PageHeaderComponent, 
    ErrorCodeComponent,
    MaterialFileUploadComponent,
    FileUploadComponent,
    CustomStatusRenderComponent,
    CustomSnoRenderComponent,
    CustomActionsComponent,
    AgActionsRendererComponent,
    ConfirmationDialogComponent];
    
const COMPONENTS_DYNAMIC = [CustomStatusRenderComponent,CustomSnoRenderComponent];
const DIRECTIVES = [];
const PIPES = [];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(),
    ...THIRD_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule,
    ToastrModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
