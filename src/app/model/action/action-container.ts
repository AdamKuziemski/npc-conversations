import { Action } from './action.interface';
import { ActionResult } from './action-result';

import { GameObject } from '../game-object';

export class ActionContainer extends GameObject {
    public actions: Action[] = [];

    public addAction(action: Action): Action {
        this.actions.push(action);
        return action;
    }

    public removeAction(index: number): void {
        if (index < 0 || index >= this.actions.length) {
            return;
        }

        this.actions.splice(index, 1);
        // might be needed if action lists don't display an empty list after splicing the last action
        /* if (this.actions.length === 0) {
            this.clearActions();
        } */
    }

    public clearActions(): void {
        this.actions = [];
    }

    public performActions(): ActionResult[] {
        const results: ActionResult[] = [];
        this.actions.forEach(act => results.push(act.perform()));
        return results.filter(result => !result.success);
    }
}