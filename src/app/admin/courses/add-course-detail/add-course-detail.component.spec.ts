import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDetailComponent } from './add-course-detail.component';

describe('AddCourseDetailComponent', () => {
  let component: AddCourseDetailComponent;
  let fixture: ComponentFixture<AddCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
