import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisfracesComponent } from './list-disfraces.component';

describe('ListDisfracesComponent', () => {
  let component: ListDisfracesComponent;
  let fixture: ComponentFixture<ListDisfracesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDisfracesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisfracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
