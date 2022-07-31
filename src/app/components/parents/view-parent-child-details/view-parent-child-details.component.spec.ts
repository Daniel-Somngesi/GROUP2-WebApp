import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentChildDetailsComponent } from './view-parent-child-details.component';

describe('ViewParentChildDetailsComponent', () => {
  let component: ViewParentChildDetailsComponent;
  let fixture: ComponentFixture<ViewParentChildDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParentChildDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParentChildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
