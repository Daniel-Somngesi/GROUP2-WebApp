import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogValuesComponent } from './view-log-values.component';

describe('ViewLogValuesComponent', () => {
  let component: ViewLogValuesComponent;
  let fixture: ComponentFixture<ViewLogValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLogValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
