import { Game } from '../game';
import { createTestDialogue } from '../../dialogue/testing/test-dialogue';
import { createTestQuest } from '../../quest/testing/test-quest';

export { Game } from '../game'; // convenience
export { GameService } from '../game.service'; // convenience

export function createTestGame(): Game {
  const testGame = new Game('The Elder Parchments CLIX: The Tiny Cave That Was Not There');

  testGame.createPlayer('Player');

  testItemTypes.forEach(type => testGame.createItemType(type));

  const archont = testGame.createItem('TestItemArchontArmor', 'Archont Armor');
  archont.type = testItemTypes[0];
  archont.isWearable = true;
  archont.value = 1337;
  archont.weight = 100;

  const magazine = testGame.createItem('TestItemDirtyMagazine', 'Magazine');
  magazine.type = testItemTypes[1];
  magazine.isReadable = true;
  magazine.value = 25;
  magazine.weight = 1;

  const potion = testGame.createItem('TestItemPotion', 'Potion');
  potion.type = testItemTypes[2];
  potion.isStackable = true;
  potion.value = 50;
  potion.weight = 0.5;

  const superPotion = testGame.createItem('TestItemSuperPotion', 'Super Potion');
  superPotion.type = testItemTypes[2];
  superPotion.isStackable = true;
  superPotion.value = 100;
  superPotion.weight = 0.5;

  const umbra = testGame.createItem('TestItemUmbra', 'Umbra');
  umbra.type = testItemTypes[3];
  umbra.value = 2000;
  umbra.weight = 32;

  const dpuh = testGame.createItem('TestItemDPUH', 'Double Penetrating Unkempt Harold');
  dpuh.type = testItemTypes[3];
  dpuh.value = 617;
  dpuh.weight = 10;

  testGame.createNPC('TestNPCTester', 'Karma the Tester').dialogue = createTestDialogue();
  testGame.createNPC('TestNPCGossip', 'Wirt');
  testGame.createNPC('TestNPCEnemy', 'Gary');
  testGame.createNPC('TestNPCMerchant', 'Creeper').isMerchant = true;
  testGame.createNPC('TestNPCTalker', 'Lucien Lachance');
  testGame.createNPC('TestNPCQuestGiver', 'Craptrap');

  const plumbersQuest = testGame.createQuest('TestQuestPlumberBros', 'Rescue the Princess from Another Castle');
  plumbersQuest.description = 'Two plumbers, Lario and Muigi, embark on a journey to find a certain princess.';
  plumbersQuest.addStage('I just found out that the Princess is in another castle. Gotta go rescue her.');
  plumbersQuest.addStage(
    'I found the castle. Looks like it has been abandoned for quite a few centuries. ' +
    'Is it possible that this is an illusion? Need to find that out.'
  );

  testGame.quests.set('TestQuestCodeception', createTestQuest());

  return testGame;
}

export const testItemTypes = [
  'TestITArmor',
  'TestITBook',
  'TestITPotion',
  'TestITWeapon'
];
