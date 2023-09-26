import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamresultmarksComponent } from './examresultmarks.component';

describe('ExamresultmarksComponent', () => {
  let component: ExamresultmarksComponent;
  let fixture: ComponentFixture<ExamresultmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamresultmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamresultmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
