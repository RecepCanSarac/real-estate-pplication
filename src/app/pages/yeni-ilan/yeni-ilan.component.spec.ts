import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeniIlanComponent } from './yeni-ilan.component';

describe('YeniIlanComponent', () => {
  let component: YeniIlanComponent;
  let fixture: ComponentFixture<YeniIlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YeniIlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YeniIlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
