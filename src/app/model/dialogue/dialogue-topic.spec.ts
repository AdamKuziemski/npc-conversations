import { DialogueTopic } from './dialogue-topic';

describe('DialogueTopic', () => {
  let topic: DialogueTopic;

  beforeEach(() => {
    topic = new DialogueTopic('Hello');
  });

  it('should be empty right after creation', () => expect(topic.empty).toBe(true));

  it('should have 2 lines', () => {
    topic.addLine('Are you the Tester?');
    topic.addLine('I thought you would come sooner or later');
    expect(topic.length).toBe(2);
  });

  it('should swap lines successfully', () => {
    topic.addLine('Are you the Tester?');
    topic.addLine('I thought you would come sooner or later');

    topic.swapLines(0, 1);

    expect(topic.lines[0].line).toBe('I thought you would come sooner or later');
    expect(topic.lines[1].line).toBe('Are you the Tester?');
  });

  it('should remove lines successfully', () => {
    topic.addLine('Are you the Tester?');
    topic.addLine('I thought you would come sooner or later');

    topic.removeLine(1);
    expect(topic.lines.length).toBe(1);
  });

  it('should have 2 child topics', () => {
    topic.addTopic('Yes, I am.');
    topic.addTopic('Are you?');
    expect(topic.totalTopics).toBe(2);
  });

  it(`should have 4 lines (including children's lines)`, () => {
    topic.addLine('Are you the Tester?');
    topic.addLine('I thought you would come sooner or later');

    topic.addTopic('Yes, I am.');
    topic.addTopic('Are you?');

    topic.topics[0].addLine('Whoa! I knew it!');
    topic.topics[1].addLine(`Do you know something I don't?`);
    expect(topic.length).toBe(4);
  });

  it(`should have 5 topics (including children's topics)`, () => {
    topic.addTopic('Yes, I am.');
    topic.addTopic('Are you?');

    topic.topics[0].addTopic('I need you to keep it a secret, though');
    topic.topics[0].topics[0].addTopic('Glad we could make it clear');
    topic.topics[1].addTopic('Maybe.');
    expect(topic.totalTopics).toBe(5);
  });

  it('should remove topics successfully', () => {
    topic.addTopic('Yes, I am.');
    topic.addTopic('Are you?');
    topic.addTopic('Howdy. Is there anything I can do?');

    expect(topic.removeTopic(1).label).toBe('Are you?');
    expect(topic.totalTopics).toBe(2);
    expect(topic.removeTopic(666)).toBeUndefined();
  });
});
