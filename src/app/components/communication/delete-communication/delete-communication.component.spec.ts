import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommunicationComponent } from './delete-communication.component';

describe('DeleteCommunicationComponent', () => {
  let component: DeleteCommunicationComponent;
  let fixture: ComponentFixture<DeleteCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
