import { Action, ActionResult } from './action.interface';
import { ActionParameter, PicklistParameter } from './action-parameter';

import { GameObject } from '../game-object';
import { Actor } from '../actor/actor';
import { Player } from '@player';

export class RemoveMoney extends GameObject implements Action {
  readonly name = 'Remove Money';

  targetId = new PicklistParameter<Actor>(Player.globalId, () => RemoveMoney.game.actors, true);
  amount = new ActionParameter<number>(0);

  constructor() {
    super();
  }

  perform(): ActionResult {
    const target = RemoveMoney.game.actor(this.targetId.value);
    if (target === null) {
      return new ActionResult(false, `Actor '${this.targetId.value}' doesn't exist`);
    }

    try {
      target.removeMoney(this.amount.value);
      return new ActionResult(true);
    } catch (error) {
      return new ActionResult(false, error.message);
    }
  }
}
