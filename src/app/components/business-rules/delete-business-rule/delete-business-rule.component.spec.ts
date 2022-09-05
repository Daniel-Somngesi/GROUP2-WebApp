import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusinessRuleComponent } from './delete-business-rule.component';

describe('DeleteBusinessRuleComponent', () => {
  let component: DeleteBusinessRuleComponent;
  let fixture: ComponentFixture<DeleteBusinessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBusinessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBusinessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
