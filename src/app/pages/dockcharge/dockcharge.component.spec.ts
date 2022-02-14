import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockchargeComponent } from './dockcharge.component';

describe('DockchargeComponent', () => {
  let component: DockchargeComponent;
  let fixture: ComponentFixture<DockchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockchargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
