import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectSearch } from './multi-select-search';

describe('MultiSelectSearch', () => {
  let component: MultiSelectSearch;
  let fixture: ComponentFixture<MultiSelectSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
