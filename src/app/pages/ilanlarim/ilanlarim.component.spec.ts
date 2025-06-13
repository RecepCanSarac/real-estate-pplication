import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlanlarimComponent } from './ilanlarim.component';

describe('IlanlarimComponent', () => {
  let component: IlanlarimComponent;
  let fixture: ComponentFixture<IlanlarimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlanlarimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlanlarimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
