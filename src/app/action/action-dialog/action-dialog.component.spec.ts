import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDialogComponent } from './action-dialog.component';

xdescribe('ActionDialogComponent', () => {
  let component: ActionDialogComponent;
  let fixture: ComponentFixture<ActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionDialogComponent]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(ActionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => expect(component).toBeTruthy());
});
