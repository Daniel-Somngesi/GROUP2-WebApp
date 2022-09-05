import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessRulesComponent } from './list-business-rules.component';

describe('ListBusinessRulesComponent', () => {
  let component: ListBusinessRulesComponent;
  let fixture: ComponentFixture<ListBusinessRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBusinessRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
