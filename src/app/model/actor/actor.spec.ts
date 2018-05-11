import { Actor } from './actor';
import { GameService } from '../game/game.service';

describe('Actor', () => {
  const testActor = new Actor('Lucien Lachance');
  const badIdentifiers = ['test', '', null, undefined];
  const bwhoa = 'DBBladeOfWoe01';
  const arrow = 'IronArrow01';
  const usles = 'UselessWasteOfSpace';

  let service: GameService = new GameService;

  beforeEach(() => {
    service = new GameService();
    Actor.initializeGameService(service);

    service.createGame('The Elder Parchments');
    service.createItem(bwhoa, 'Blade of Whoa');
    service.createItem(arrow, 'Iron Arrow').isCountable = true;
    service.createItem(usles, 'Waste Of Space');
  });

  it('should return false when looking for non-existent, null or undefined items', () => {
    badIdentifiers.forEach(id => expect(testActor.hasItem(id)).toBe(false));
  });

  it('should return 0 as count for non-existent, null or undefined items', () => {
    badIdentifiers.forEach(id => expect(testActor.getItemCount(id)).toBe(0));
  });

  it('should return null when trying to get a non-existent, null or undefined item', () => {
    badIdentifiers.forEach(id => expect(testActor.getItem(id)).toBeNull());
  });

  it(`should add items to the actor's backpack`, () => {
    testActor.addItem(bwhoa);
    testActor.addItem(bwhoa);
    testActor.addItem(arrow, 10);

    expect(testActor.hasItem(bwhoa)).toBe(true);
    expect(testActor.getItemCount(bwhoa)).toBe(2);
    expect(testActor.getItemCount(arrow)).toBe(10);
  });

  it('should have 4 items in the backpack', () => {
    testActor.addItem(usles);
    expect(testActor.getBackpack().length).toBe(4);
  });

  it(`should remove some items from the actor's backpack`, () => {
    testActor.removeItem(bwhoa);
    testActor.removeItem(arrow, 5);

    expect(testActor.hasItem(bwhoa)).toBe(true);
    expect(testActor.getItemCount(bwhoa)).toBe(1);
    expect(testActor.getItemCount(arrow)).toBe(5);
  });

  it(`should remove the rest of the items from the actor's backpack`, () => {
    testActor.removeItem(arrow, 20);

    expect(testActor.hasItem(arrow)).toBe(false);
    expect(testActor.getItemCount(arrow)).toBe(0);
  });

  it('should have 0 money', () => expect(testActor.money).toBe(0));

  it('should add 100 money to the actor', () => {
    testActor.addMoney(100);
    expect(testActor.money).toBe(100);
  });

  it('should throw an error when adding negative amounts of money', () => {
    expect(() => testActor.addMoney(-100)).toThrowError('Cannot remove money when adding it');
  });

  it('should be accurately checking if the actor has enough money', () => {
    expect(testActor.hasMoney(10)).toBe(true);
    expect(testActor.hasMoney(100)).toBe(true);
    expect(testActor.hasMoney(200)).toBe(false);
  });

  it('should be properly removing money', () => {
    testActor.removeMoney(50);
    expect(testActor.money).toBe(50);
  });

  it('should set money to 0 when trying to remove too much', () => {
    testActor.removeMoney(1000);
    expect(testActor.money).toBe(0);
  });
});