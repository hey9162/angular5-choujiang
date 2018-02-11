import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPrizeComponent } from './redeem-prize.component';

describe('RedeemPrizeComponent', () => {
  let component: RedeemPrizeComponent;
  let fixture: ComponentFixture<RedeemPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemPrizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
