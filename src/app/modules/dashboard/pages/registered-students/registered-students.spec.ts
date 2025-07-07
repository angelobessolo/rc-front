import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredStudents } from './registered-students';

describe('RegisteredStudents', () => {
  let component: RegisteredStudents;
  let fixture: ComponentFixture<RegisteredStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
