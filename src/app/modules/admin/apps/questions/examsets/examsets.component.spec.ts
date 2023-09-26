import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsetsComponent } from './examsets.component';

describe('ExamsetsComponent', () => {
  let component: ExamsetsComponent;
  let fixture: ComponentFixture<ExamsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
