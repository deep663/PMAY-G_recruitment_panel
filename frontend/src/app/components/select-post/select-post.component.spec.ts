import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPostComponent } from './select-post.component';

describe('SelectPostComponent', () => {
  let component: SelectPostComponent;
  let fixture: ComponentFixture<SelectPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
