import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListComponent } from './action-list.component';

xdescribe('ActionListComponent', () => {
  let component: ActionListComponent;
  let fixture: ComponentFixture<ActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionListComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ActionListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
