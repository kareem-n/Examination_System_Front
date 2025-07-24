import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentSubjectsComponent } from './list-student-subjects.component';

describe('ListStudentSubjectsComponent', () => {
  let component: ListStudentSubjectsComponent;
  let fixture: ComponentFixture<ListStudentSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudentSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudentSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
