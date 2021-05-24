import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecourseComponent } from './deletecourse.component';

describe('DeletecourseComponent', () => {
  let component: DeletecourseComponent;
  let fixture: ComponentFixture<DeletecourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
