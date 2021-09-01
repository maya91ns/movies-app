import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePickDateWatchedModalComponent } from './movie-pick-date-watched-modal.component';

describe('MoviePickDateWatchedModalComponent', () => {
  let component: MoviePickDateWatchedModalComponent;
  let fixture: ComponentFixture<MoviePickDateWatchedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePickDateWatchedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePickDateWatchedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
