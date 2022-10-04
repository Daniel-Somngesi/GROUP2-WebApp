import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeAddressComponent } from './view-employee-address.component';

describe('ViewEmployeeAddressComponent', () => {
  let component: ViewEmployeeAddressComponent;
  let fixture: ComponentFixture<ViewEmployeeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeeAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
