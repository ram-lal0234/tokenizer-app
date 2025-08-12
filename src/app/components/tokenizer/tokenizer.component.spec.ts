import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizerComponent } from './tokenizer.component';

describe('TokenizerComponent', () => {
  let component: TokenizerComponent;
  let fixture: ComponentFixture<TokenizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
