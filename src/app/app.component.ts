import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PreloaderService } from '@core';
import { CustomTranslateService } from '@shared/providers/custom-translate-service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private preloader: PreloaderService,
    private customTranslateService: CustomTranslateService) {
      customTranslateService.setLanguage('en-US');
    }

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
