import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanDetayComponent } from './ilan-detay.component';

describe('IlanDetayComponent', () => {
  let component: IlanDetayComponent;
  let fixture: ComponentFixture<IlanDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlanDetayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
