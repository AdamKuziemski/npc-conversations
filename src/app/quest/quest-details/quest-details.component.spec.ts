import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { createTestGame, Game, GameService } from '@game/testing/test-game';
import { ActivatedRoute, ActivatedRouteStub } from '@testing/activated-route-stub';
import { changeValue } from '@testing/changeValue.function';

import { Quest } from '@quest/quest';
import { ResponsiveService } from '@responsive-service';

import { QuestDetailsComponent } from './quest-details.component';

describe('QuestDetailsComponent', () => {
  let component: QuestDetailsComponent;
  let fixture: ComponentFixture<QuestDetailsComponent>;
  let testGame: Game;

  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  const testQuestId: string = 'TestQuestPlumberBros';
  const testQuest: () => Quest = (): Quest => testGame.quests.get(testQuestId);

  beforeEach(() => {
    activatedRoute.setParamMap({ id: testQuestId });
    testGame = createTestGame();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestDetailsComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatExpansionModule,
        MatInputModule,
        MatListModule,
        NoopAnimationsModule
      ],
      providers: [
        GameService,
        ResponsiveService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(QuestDetailsComponent);
      component = fixture.componentInstance;

      component.game.setGame(testGame);

      fixture.detectChanges();
    });
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should subscribe to route params and retrieve a quest', () => {
    expect(component.questId).toBe(testQuestId);
    expect(component.quest).toEqual(testQuest());
  });

  it('should correctly return constants from Quest', () => {
    expect(component.maximumNameLength).toBe(Quest.maximumNameLength);
    expect(component.maximumDescriptionLength).toBe(Quest.maximumDescriptionLength);
  });

  it('should display a mat-card with quest details', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-card'))).not.toBeNull();
  }));

  it('should display a mat-accordion with quest stages', fakeAsync(() => {
    tick();
    expect(fixture.debugElement.query(By.css('mat-accordion'))).not.toBeNull();
  }));

  it('should double bind inputs', fakeAsync(() => {
    tick();

    const nameInput: DebugElement = fixture.debugElement.query(By.css('input'));
    const descriptionArea: DebugElement = fixture.debugElement.queryAll(By.css('textarea'))[0];

    expect(nameInput).not.toBeNull();
    expect(descriptionArea).not.toBeNull();
    expect(nameInput.nativeElement.value).toBe(component.quest.name, 'name input binds with quest name');
    expect(descriptionArea.nativeElement.value).toBe(component.quest.description, 'description input binds with quest description');

    changeValue(nameInput, 'NewTestName');
    changeValue(descriptionArea, 'Hurro');

    fixture.detectChanges();
    tick();

    expect(component.quest.name).toBe('NewTestName', 'quest name changes when name input changes value');
    expect(component.quest.description).toBe('Hurro', 'quest description changes when description input changes value');
  }));

  it('should overwrite quest data during onDestroy', fakeAsync(() => {
    tick();

    const initialQuestData: Quest = {...testQuest()} as Quest;
    const nameInput: DebugElement = fixture.debugElement.query(By.css('input'));

    changeValue(nameInput, 'NewTestName');
    fixture.detectChanges();
    tick();

    fixture.componentInstance.ngOnDestroy();
    tick();

    expect(component.quest).not.toEqual(initialQuestData, 'new quest should be different from the initial one');
    expect(component.quest).toEqual(testQuest(), 'new quest data should be in the game');
  }));
});
