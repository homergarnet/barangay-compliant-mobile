import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrimePage } from './crime.page';

describe('CrimePage', () => {
  let component: CrimePage;
  let fixture: ComponentFixture<CrimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
