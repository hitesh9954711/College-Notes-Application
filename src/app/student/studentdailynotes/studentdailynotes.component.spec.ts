import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdailynotesComponent } from './studentdailynotes.component';

describe('StudentdailynotesComponent', () => {
  let component: StudentdailynotesComponent;
  let fixture: ComponentFixture<StudentdailynotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentdailynotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdailynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
