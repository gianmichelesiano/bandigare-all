import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZefixComponent } from './zefix.component';

describe('ZefixComponent', () => {
  let component: ZefixComponent;
  let fixture: ComponentFixture<ZefixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZefixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
