import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommunicationsComponent } from './list-communications.component';

describe('ListCommunicationsComponent', () => {
  let component: ListCommunicationsComponent;
  let fixture: ComponentFixture<ListCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommunicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
