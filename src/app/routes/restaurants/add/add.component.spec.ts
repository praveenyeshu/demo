import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsAddComponent } from './add.component';

describe('AddComponent', () => {
  let component: RestaurantsAddComponent;
  let fixture: ComponentFixture<RestaurantsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
