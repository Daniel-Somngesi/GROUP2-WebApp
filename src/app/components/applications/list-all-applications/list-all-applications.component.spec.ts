import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllApplicationsComponent } from './list-all-applications.component';

describe('ListAllApplicationsComponent', () => {
  let component: ListAllApplicationsComponent;
  let fixture: ComponentFixture<ListAllApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
