import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BvdComponent } from './bvd.component';

describe('BvdComponent', () => {
  let component: BvdComponent;
  let fixture: ComponentFixture<BvdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BvdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BvdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
