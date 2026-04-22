import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Integrant } from './integrant';

describe('Integrant', () => {
  let component: Integrant;
  let fixture: ComponentFixture<Integrant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Integrant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Integrant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
