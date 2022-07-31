import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAcademicYearComponent } from './add-new-academic-year.component';

describe('AddNewAcademicYearComponent', () => {
  let component: AddNewAcademicYearComponent;
  let fixture: ComponentFixture<AddNewAcademicYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAcademicYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
