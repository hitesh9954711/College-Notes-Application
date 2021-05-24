import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestsComponent } from './teacher-requests.component';

describe('TeacherRequestsComponent', () => {
  let component: TeacherRequestsComponent;
  let fixture: ComponentFixture<TeacherRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
