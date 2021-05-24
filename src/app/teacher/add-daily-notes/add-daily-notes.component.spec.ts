import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyNotesComponent } from './add-daily-notes.component';

describe('AddDailyNotesComponent', () => {
  let component: AddDailyNotesComponent;
  let fixture: ComponentFixture<AddDailyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailyNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
