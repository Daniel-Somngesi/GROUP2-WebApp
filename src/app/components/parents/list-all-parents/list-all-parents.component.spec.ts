import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllParentsComponent } from './list-all-parents.component';

describe('ListAllParentsComponent', () => {
  let component: ListAllParentsComponent;
  let fixture: ComponentFixture<ListAllParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllParentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
