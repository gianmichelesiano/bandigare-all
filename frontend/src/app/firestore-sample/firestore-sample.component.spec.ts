import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreSampleComponent } from './firestore-sample.component';

describe('FirestoreSampleComponent', () => {
  let component: FirestoreSampleComponent;
  let fixture: ComponentFixture<FirestoreSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirestoreSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestoreSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
