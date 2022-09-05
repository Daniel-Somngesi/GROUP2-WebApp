import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTreeComponent } from './manage-tree.component';

describe('ManageTreeComponent', () => {
  let component: ManageTreeComponent;
  let fixture: ComponentFixture<ManageTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
