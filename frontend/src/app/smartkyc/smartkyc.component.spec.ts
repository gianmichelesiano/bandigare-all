import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartkycComponent } from './smartkyc.component';

describe('SmartkycComponent', () => {
  let component: SmartkycComponent;
  let fixture: ComponentFixture<SmartkycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartkycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
