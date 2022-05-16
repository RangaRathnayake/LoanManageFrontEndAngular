import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistryComponent } from './histry.component';

describe('HistryComponent', () => {
  let component: HistryComponent;
  let fixture: ComponentFixture<HistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
