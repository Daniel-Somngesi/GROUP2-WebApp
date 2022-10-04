import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComuunicationComponent } from './view-comuunication.component';

describe('ViewComuunicationComponent', () => {
  let component: ViewComuunicationComponent;
  let fixture: ComponentFixture<ViewComuunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComuunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComuunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
