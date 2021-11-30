import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenceseComponent } from './expencese.component';

describe('ExpenceseComponent', () => {
  let component: ExpenceseComponent;
  let fixture: ComponentFixture<ExpenceseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenceseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenceseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
