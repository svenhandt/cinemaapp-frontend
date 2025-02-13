import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationsOverviewComponent } from './presentations-overview.component';

describe('PresentationsOverviewComponent', () => {
  let component: PresentationsOverviewComponent;
  let fixture: ComponentFixture<PresentationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
