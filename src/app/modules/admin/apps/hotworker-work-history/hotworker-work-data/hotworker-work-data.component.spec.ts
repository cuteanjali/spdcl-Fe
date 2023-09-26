import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotworkerWorkDataComponent } from './hotworker-work-data.component';

describe('HotworkerWorkDataComponent', () => {
  let component: HotworkerWorkDataComponent;
  let fixture: ComponentFixture<HotworkerWorkDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotworkerWorkDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotworkerWorkDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
