import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumeComponent } from './modal-resume.component';

describe('ModalResumeComponent', () => {
  let component: ModalResumeComponent;
  let fixture: ComponentFixture<ModalResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
