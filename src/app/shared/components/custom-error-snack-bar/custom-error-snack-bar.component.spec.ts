import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorSnackBarComponent } from './custom-error-snack-bar.component';

describe('CustomErrorSnackBarComponent', () => {
  let component: CustomErrorSnackBarComponent;
  let fixture: ComponentFixture<CustomErrorSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomErrorSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomErrorSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
