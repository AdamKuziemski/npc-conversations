import { GameObject } from '../game-object';
import { DialogueTopic } from './dialogue-topic';
import { DialogueLine } from './dialogue-line';

export class Dialogue extends GameObject {
  greetings: DialogueLine[] = [];
  topics: DialogueTopic[] = [];
  isOpen = false;

  currentLine: DialogueLine = null;
  currentTopic: DialogueTopic = null;
  lineIndex = -1;

  constructor() {
    super();
  }

  static exampleDialogue(): Dialogue {
    let example = new Dialogue();
    example.addGreeting('Example Greeting');
    example.addTopic('Example Topic');
    return example;
  }

  //#region flow control
  get backToStart(): boolean {
    return this.isOpen ?
      !this.hasTopic || (this.linesFinished && (this.currentTopic.backToStart || this.topicOptions.length === 0)) :
      true;
  }

  get goodbye(): boolean {
    return this.isOpen ?
      (this.displayOptions && this.hasTopic && this.currentTopic.goodbye) :
      true;
  }

  get displayOptions(): boolean {
    return this.isOpen ? (!this.hasTopic || this.linesFinished) : true;
  }

  get linesFinished(): boolean {
    return this.hasTopic && this.lineIndex >= this.topicLinesCount;
  }

  get hasTopic(): boolean {
    return this.currentTopic !== null;
  }

  get topicLinesCount(): number {
    return this.hasTopic ? this.currentTopic.lines.length : 0;
  }

  get topicOptions(): DialogueTopic[] {
    return this.hasTopic ? this.currentTopic.topics.filter(topic => topic.available) : [];
  }
  //#endregion
  
  //#region conversation
  open(): void {
    this.isOpen = true;
    this.reset();
  }

  get options(): DialogueTopic[] {
    if (!this.isOpen) {
      return [];
    }

    return (this.hasTopic ? this.topicOptions : this.topics.filter(option => option.available));
  }

  get availableGreetings(): DialogueLine[] {
    return this.greetings.filter(greet => greet.available);
  }

  get randomGreeting(): DialogueLine {
    const greets = this.availableGreetings;
    if (greets.length === 0) {
      return null;
    }

    const index = this.getRandomInt(greets.length);
    return greets[index];
  }

  topic(path: number[]): DialogueTopic {
    if (!Array.isArray(path) || path.length < 1 || path[0] >= this.topics.length) {
      return null;
    }

    let result = this.topics[path[0]];

    for (let i = 1; i < path.length; ++i) {
      if (result.topics.length < path[i]) {
        return null;
      } else {
        result = result.topics[path[i]];
      }
    }

    return result;
  }

  skipToOptions(): void {
    while (!this.displayOptions) {
      this.advanceLine();
    }
  }

  advanceLine(): void {
    if (this.currentLine.isGreeting) {
      return;
    }

    ++this.lineIndex;

    if (!this.displayOptions) {
      this.currentLine = this.currentTopic.lines[this.lineIndex];
    } else if (this.goodbye) {
      // temporary - update an observable in the future
      console.log('goodbye');
      // this.isOpen = false;
      this.reset();
    } else if (this.backToStart) {
      this.reset();
    }
  }

  startTopic(topic: DialogueTopic): void {
    if (!topic) {
      throw Error('Cannot start a topic that is ' + topic);
    }

    this.currentTopic = topic;
    this.lineIndex = 0;

    if (!this.displayOptions) {
      this.currentLine = this.currentTopic.lines[this.lineIndex];
    }
  }

  reset(): void {
    this.lineIndex = -1;
    this.currentTopic = null;
    this.currentLine = this.randomGreeting;
  }
  //#endregion

  //#region counters
  get empty(): boolean {
    return this.totalGreetings === 0 && this.topics.length === 0;
  }

  get length(): number {
    return this.topics.reduce((sum, topic) => sum + topic.length, this.totalTopics);
  }

  get totalGreetings(): number {
    return this.greetings.length;
  }

  get totalTopics(): number {
    return this.topics.reduce((sum, topic) => sum + topic.totalTopics, this.topics.length);
  }
  //#endregion

  //#region adders/removers
  addGreeting(greeting: string): DialogueLine {
    this.greetings.push(new DialogueLine(greeting, true));
    return this.lastOf(this.greetings);
  }

  addGreetings(greetings: string[]): DialogueLine {
    greetings.forEach(elem => this.addGreeting(elem));
    return this.lastOf(this.greetings);
  }

  addTopic(label: string): DialogueTopic {
    this.topics.push(new DialogueTopic(label));
    return this.lastOf(this.topics);
  }

  removeGreeting(index: number): void {
    this.greetings.splice(index, 1);
  }
  //#endregion

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
