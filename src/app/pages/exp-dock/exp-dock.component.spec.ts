import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpDockComponent } from './exp-dock.component';

describe('ExpDockComponent', () => {
  let component: ExpDockComponent;
  let fixture: ComponentFixture<ExpDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpDockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
