import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailZefixComponent } from './detail-zefix.component';

describe('DetailZefixComponent', () => {
  let component: DetailZefixComponent;
  let fixture: ComponentFixture<DetailZefixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailZefixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailZefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
