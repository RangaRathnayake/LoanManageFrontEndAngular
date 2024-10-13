import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycapitalComponent } from './paycapital.component';

describe('MoreinfoComponent', () => {
  let component: PaycapitalComponent;
  let fixture: ComponentFixture<PaycapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaycapitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
