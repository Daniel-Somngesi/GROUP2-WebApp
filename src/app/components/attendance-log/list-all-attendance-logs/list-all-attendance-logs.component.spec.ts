import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAttendanceLogsComponent } from './list-all-attendance-logs.component';

describe('ListAllAttendanceLogsComponent', () => {
  let component: ListAllAttendanceLogsComponent;
  let fixture: ComponentFixture<ListAllAttendanceLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllAttendanceLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllAttendanceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
