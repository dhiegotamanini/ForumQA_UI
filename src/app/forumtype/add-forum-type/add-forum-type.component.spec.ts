import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForumTypeComponent } from './add-forum-type.component';

describe('AddForumTypeComponent', () => {
  let component: AddForumTypeComponent;
  let fixture: ComponentFixture<AddForumTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddForumTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddForumTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
