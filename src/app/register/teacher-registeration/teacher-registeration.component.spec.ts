import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterationComponent } from './teacher-registeration.component';

describe('TeacherRegisterationComponent', () => {
  let component: TeacherRegisterationComponent;
  let fixture: ComponentFixture<TeacherRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
