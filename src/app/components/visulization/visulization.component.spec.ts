import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisulizationComponent } from './visulization.component';

describe('VisulizationComponent', () => {
  let component: VisulizationComponent;
  let fixture: ComponentFixture<VisulizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisulizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisulizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
