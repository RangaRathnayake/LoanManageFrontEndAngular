import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloanComponent } from './calloan.component';

describe('CalloanComponent', () => {
  let component: CalloanComponent;
  let fixture: ComponentFixture<CalloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
