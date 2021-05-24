import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallcourseComponent } from './viewallcourse.component';

describe('ViewallcourseComponent', () => {
  let component: ViewallcourseComponent;
  let fixture: ComponentFixture<ViewallcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
