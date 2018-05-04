import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHouseComponent } from './company-house.component';

describe('CompanyHouseComponent', () => {
  let component: CompanyHouseComponent;
  let fixture: ComponentFixture<CompanyHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
