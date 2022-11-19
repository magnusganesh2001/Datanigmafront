import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedCandidatesComponent } from './applied-candidates.component';

describe('AppliedCandidatesComponent', () => {
  let component: AppliedCandidatesComponent;
  let fixture: ComponentFixture<AppliedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
