import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsettingsComponent } from './systemsettings.component';

describe('SystemsettingsComponent', () => {
  let component: SystemsettingsComponent;
  let fixture: ComponentFixture<SystemsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
