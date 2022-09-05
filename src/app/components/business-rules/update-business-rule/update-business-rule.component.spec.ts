import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinessRuleComponent } from './update-business-rule.component';

describe('UpdateBusinessRuleComponent', () => {
  let component: UpdateBusinessRuleComponent;
  let fixture: ComponentFixture<UpdateBusinessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBusinessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBusinessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
