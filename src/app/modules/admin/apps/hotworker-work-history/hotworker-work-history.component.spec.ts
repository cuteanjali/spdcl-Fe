import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotworkerWorkHistoryComponent } from './hotworker-work-history.component';

describe('HotworkerWorkHistoryComponent', () => {
  let component: HotworkerWorkHistoryComponent;
  let fixture: ComponentFixture<HotworkerWorkHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotworkerWorkHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotworkerWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
