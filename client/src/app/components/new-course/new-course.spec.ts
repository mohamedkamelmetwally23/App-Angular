import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourse } from './new-course';

describe('NewCourse', () => {
  let component: NewCourse;
  let fixture: ComponentFixture<NewCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCourse],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCourse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
