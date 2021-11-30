import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProploanComponent } from './proploan.component';

describe('ProploanComponent', () => {
  let component: ProploanComponent;
  let fixture: ComponentFixture<ProploanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProploanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProploanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
