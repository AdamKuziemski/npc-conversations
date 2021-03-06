import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Item } from 'app/model/item/item';

import { GameService } from '@game-service';
import { ResponsiveService } from '@responsive-service';
import { Destroyable, untilDestroyed } from 'app/shared/types/destroyable';

type OpenPanel = 'none' | 'description' | 'content' | 'actions';

@Component({
  selector: 'ncv-item-details',
  styleUrls: ['./item-details.component.scss'],
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent extends Destroyable implements OnInit, OnDestroy {
  item: Item;
  itemId: string;
  currentPanel: OpenPanel = 'none';

  constructor(
    public game: GameService,
    public responsive: ResponsiveService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.itemId = params.get('id');
      this.item = this.game.item(this.itemId);
    });
  }

  ngOnDestroy(): void {
    this.game.items.set(this.itemId, this.item);
  }

  //#region description
  get isDescriptionOpen(): boolean {
    return this.currentPanel === 'description';
  }

  openDescriptionPanel(): void {
    this.currentPanel = 'description';
  }
  //#endregion

  //#region content
  get isContentOpen(): boolean {
    return this.currentPanel === 'content';
  }

  openContentPanel(): void {
    this.currentPanel = 'content';
  }

  closeContentPanel(): void {
    if (this.isContentOpen) {
      this.currentPanel = 'none';
    }
  }
  //#endregion

  //#region actions
  get isActionsOpen(): boolean {
    return this.currentPanel === 'actions';
  }

  openActionsPanel(): void {
    this.currentPanel = 'actions';
  }
  //#endregion

  get maximumNameLength(): number { return Item.maximumNameLength; }
  get maximumDescriptionLength(): number { return Item.maximumDescriptionLength; }
}
