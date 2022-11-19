import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobsComponent } from './find-jobs.component';

describe('FindJobsComponent', () => {
  let component: FindJobsComponent;
  let fixture: ComponentFixture<FindJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
