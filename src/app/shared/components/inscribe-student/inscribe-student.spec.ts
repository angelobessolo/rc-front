import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribeStudent } from './inscribe-student';

describe('InscribeStudent', () => {
  let component: InscribeStudent;
  let fixture: ComponentFixture<InscribeStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscribeStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribeStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
