import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponPage } from './cupon.page';

describe('CuponPage', () => {
  let component: CuponPage;
  let fixture: ComponentFixture<CuponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
