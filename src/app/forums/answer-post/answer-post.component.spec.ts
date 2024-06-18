import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPostComponent } from './answer-post.component';

describe('AnswerPostComponent', () => {
  let component: AnswerPostComponent;
  let fixture: ComponentFixture<AnswerPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
