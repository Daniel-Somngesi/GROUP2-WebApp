import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessRuleComponent } from './add-business-rule.component';

describe('AddBusinessRuleComponent', () => {
  let component: AddBusinessRuleComponent;
  let fixture: ComponentFixture<AddBusinessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
