import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersdetailsComponent } from './workersdetails.component';

describe('WorkersdetailsComponent', () => {
  let component: WorkersdetailsComponent;
  let fixture: ComponentFixture<WorkersdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
