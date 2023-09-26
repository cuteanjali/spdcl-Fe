import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionspdfuploadComponent } from './questionspdfupload.component';

describe('QuestionspdfuploadComponent', () => {
  let component: QuestionspdfuploadComponent;
  let fixture: ComponentFixture<QuestionspdfuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionspdfuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionspdfuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
