import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleAlertComponent } from './idle-alert.component';

describe('IdleAlertComponent', () => {
  let component: IdleAlertComponent;
  let fixture: ComponentFixture<IdleAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
