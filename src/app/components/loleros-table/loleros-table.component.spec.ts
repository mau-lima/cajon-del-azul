import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolerosTableComponent } from './loleros-table.component';

describe('LolerosTableComponent', () => {
  let component: LolerosTableComponent;
  let fixture: ComponentFixture<LolerosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LolerosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolerosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
