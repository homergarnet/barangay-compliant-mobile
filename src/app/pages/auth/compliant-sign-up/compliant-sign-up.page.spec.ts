import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompliantSignUpPage } from './compliant-sign-up.page';

describe('CompliantSignUpPage', () => {
  let component: CompliantSignUpPage;
  let fixture: ComponentFixture<CompliantSignUpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompliantSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
