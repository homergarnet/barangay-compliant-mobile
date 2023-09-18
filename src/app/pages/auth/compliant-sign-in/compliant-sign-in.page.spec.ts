import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompliantSignInPage } from './compliant-sign-in.page';

describe('CompliantSignInPage', () => {
  let component: CompliantSignInPage;
  let fixture: ComponentFixture<CompliantSignInPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompliantSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
