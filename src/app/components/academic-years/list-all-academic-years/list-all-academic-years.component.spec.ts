import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAcademicYearsComponent } from './list-all-academic-years.component';

describe('ListAllAcademicYearsComponent', () => {
  let component: ListAllAcademicYearsComponent;
  let fixture: ComponentFixture<ListAllAcademicYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllAcademicYearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllAcademicYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
