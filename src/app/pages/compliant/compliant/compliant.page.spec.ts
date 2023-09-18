import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompliantPage } from './compliant.page';

describe('CompliantPage', () => {
  let component: CompliantPage;
  let fixture: ComponentFixture<CompliantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompliantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
