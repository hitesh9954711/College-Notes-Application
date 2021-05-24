import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteadminComponent } from './deleteadmin.component';

describe('DeleteadminComponent', () => {
  let component: DeleteadminComponent;
  let fixture: ComponentFixture<DeleteadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
