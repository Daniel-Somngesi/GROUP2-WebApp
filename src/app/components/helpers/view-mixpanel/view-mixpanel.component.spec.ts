import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMixpanelComponent } from './view-mixpanel.component';

describe('ViewMixpanelComponent', () => {
  let component: ViewMixpanelComponent;
  let fixture: ComponentFixture<ViewMixpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMixpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMixpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
