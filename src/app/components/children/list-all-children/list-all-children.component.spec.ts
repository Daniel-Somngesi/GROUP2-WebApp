import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllChildrenComponent } from './list-all-children.component';

describe('ListAllChildrenComponent', () => {
  let component: ListAllChildrenComponent;
  let fixture: ComponentFixture<ListAllChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
