import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailynotesComponent } from './dailynotes.component';

describe('DailynotesComponent', () => {
  let component: DailynotesComponent;
  let fixture: ComponentFixture<DailynotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailynotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
