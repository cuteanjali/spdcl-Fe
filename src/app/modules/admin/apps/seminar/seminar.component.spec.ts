import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarComponent } from './seminar.component';
import { MatTableModule } from '@angular/material/table';

describe('SeminarComponent', () => {
  let component: SeminarComponent;
  let fixture: ComponentFixture<SeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
