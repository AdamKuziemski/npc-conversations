import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { Dialogue } from '../model/dialogue/dialogue';
import { DialogueComponent } from './dialogue.component';
import { DialogueLine } from '../model/dialogue/dialogue-line';
import { DialogueLineComponent } from './dialogue-line/dialogue-line.component';
import { DialogueTopic } from '../model/dialogue/dialogue-topic';
import { DialogueTopicComponent } from './dialogue-topic/dialogue-topic.component';

@NgModule({
  declarations: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatListModule
  ],
  providers: [ ],
  exports: [
    DialogueComponent,
    DialogueLineComponent,
    DialogueTopicComponent
  ]
})
export class DialogueModule { }