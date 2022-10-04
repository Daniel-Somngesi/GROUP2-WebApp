import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDeleteParentComponent } from './force-delete-parent.component';

describe('ForceDeleteParentComponent', () => {
  let component: ForceDeleteParentComponent;
  let fixture: ComponentFixture<ForceDeleteParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceDeleteParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceDeleteParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
