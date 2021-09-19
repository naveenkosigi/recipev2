import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDummyContentComponent } from './recipe-dummy-content.component';

describe('RecipeDummyContentComponent', () => {
  let component: RecipeDummyContentComponent;
  let fixture: ComponentFixture<RecipeDummyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDummyContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDummyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
