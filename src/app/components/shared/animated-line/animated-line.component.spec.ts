import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedLineComponent } from './animated-line.component';

describe('AnimatedLineComponent', () => {
  let component: AnimatedLineComponent;
  let fixture: ComponentFixture<AnimatedLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
