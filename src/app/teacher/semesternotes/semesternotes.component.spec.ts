import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesternotesComponent } from './semesternotes.component';

describe('SemesternotesComponent', () => {
  let component: SemesternotesComponent;
  let fixture: ComponentFixture<SemesternotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesternotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesternotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
