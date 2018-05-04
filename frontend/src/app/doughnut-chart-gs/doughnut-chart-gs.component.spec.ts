import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartGSComponent } from './doughnut-chart-gs.component';

describe('DoughnutChartGSComponent', () => {
  let component: DoughnutChartGSComponent;
  let fixture: ComponentFixture<DoughnutChartGSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartGSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartGSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
