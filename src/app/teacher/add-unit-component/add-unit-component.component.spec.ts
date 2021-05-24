import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitComponentComponent } from './add-unit-component.component';

describe('AddUnitComponentComponent', () => {
  let component: AddUnitComponentComponent;
  let fixture: ComponentFixture<AddUnitComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
