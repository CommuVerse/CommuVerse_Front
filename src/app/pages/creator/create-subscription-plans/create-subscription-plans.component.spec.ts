import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionPlanComponent } from './create-subscription-plans.component';

describe('CreateSubscrptionPlansComponent', () => {
  let component: CreateSubscriptionPlanComponent;
  let fixture: ComponentFixture<CreateSubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscriptionPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
