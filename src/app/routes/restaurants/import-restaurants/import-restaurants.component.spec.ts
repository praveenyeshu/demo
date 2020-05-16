import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsImportRestaurantsComponent } from './import-restaurants.component';

describe('ImportRestaurantsComponent', () => {
  let component: RestaurantsImportRestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsImportRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsImportRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsImportRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
