import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanDuzenleComponent } from './ilan-duzenle.component';

describe('IlanDuzenleComponent', () => {
  let component: IlanDuzenleComponent;
  let fixture: ComponentFixture<IlanDuzenleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlanDuzenleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
