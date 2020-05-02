import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

import { DefaultInterceptor } from '@core';
import { StartupService } from '@core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { CustomTranslateService } from '@shared/providers/custom-translate-service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: "./assets/i18n/messages/", suffix: ".json"},
      {prefix: "./assets/i18n/errors/", suffix: ".json"},
  ]);
}

export class CustomMissingTranslationHandler implements MissingTranslationHandler{
  handle(params:MissingTranslationHandlerParams)
  {
    console.warn(`missing translation for key ${params.key}`);
    return 'An Unexpeted error /occured.. Please check more info in the console.';
  }
}

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    RoutesModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      missingTranslationHandler:{
        provide:MissingTranslationHandler,
        useClass:CustomMissingTranslationHandler
      }
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
    
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  CustomTranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
