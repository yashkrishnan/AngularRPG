import {ClassOptions, GenderOptions, RaceOptions} from "./character.options";

export class Armor {
  name: string;
  attackBarrierBonus: number;

  constructor(name: string, attackBarrierBonus: number) {
    this.name = name;
    this.attackBarrierBonus = attackBarrierBonus;
  }

}

export class Weapon {
  name: string;
  minDamage: number;
  maxDamage: number;

  constructor(name: string, minDamage: number, maxDamage: number) {
    this.name = name;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
  }
}

export enum CharacterSkills {
  attack = "attack",
  sneak = "sneak",
  persuade = "persuade",
  intelligence = "intelligence"
}

export enum FightOptions {
  attack = "Attack",
  specialAttack = "Special Attack",
  none = "None"
}

export const ExperienceToLevel = {
  1: 1000,
  2: 2000,
  3: 3000,
  4: 4000,
  5: 5000,
  6: 6000,
  7: 7000,
  8: 8000,
  9: 9000
}

export class BaseCharacter {
  name: string;
  maxHealth: number;
  currentHealth: number;
  isIncapacitated: boolean;
  barriers: {
    attack: number,
    sneak: number,
    persuade: number
  };
  skills: {
    attack: number,
    sneak: number,
    persuade: number,
    intelligence: number
  };
  equippedWeapon: Weapon;
  equippedArmor: Armor;
  spriteUrl: string;

  constructor(name: string, health: number, skills = {attack: 0, sneak: 0, persuade: 0, intelligence: 0}) {
    this.name = name;
    this.maxHealth = health;
    this.currentHealth = health;
    this.skills = skills;
    this.isIncapacitated = false;
    this.barriers = {
      attack: 10,
      sneak: 10,
      persuade: 10
    }
  }

  attack() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.attack;
  }

  sneak() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.sneak;
  }

  persuade() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.persuade;
  }

  dealDamage() {
    return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1));
  }
}

export class Monster extends BaseCharacter {
  isTrapped: boolean = false;
  poisonStacks: number = 0;
  isStrongPoison: boolean = false;
  hasTakenPoisonDamageThisTurn: boolean = false;

  constructor(name, health, skills, barriers: { attack: number, sneak: number, persuade: number, intelligence: number }, minDamage, maxDamage, spriteUrl) {
    super(name, health, skills);
    this.barriers = barriers;
    this.spriteUrl = spriteUrl;
    this.equippedWeapon = new Weapon(undefined, minDamage, maxDamage);
  }
}

export class Hero extends BaseCharacter {
  gender: string;
  race: string;
  characterRole: string;
  experience: number;
  level: number;
  availableSkillPoints: number;
  hasTrapDefence: boolean;
  hasDamagingTrap: boolean;
  turnsUntilSpecialAvailableAgain: number;

  constructor(name, gender, race, level, health, skills, weapon, armor) {
    super(name, health, skills);

    this.gender = gender;
    this.race = race;
    this.experience = 0;
    this.level = level;
    this.equippedWeapon = weapon;
    this.equipNewArmor(armor);
  }

  levelUp(): void {
    this.experience -= ExperienceToLevel[this.level];
    this.level++;
    this.availableSkillPoints += 2;
    if (this.experience >= ExperienceToLevel[this.level]) {
      this.levelUp();
    }
  }

  equipNewArmor(armor: Armor): void {
    if (this.equippedArmor) {
      this.barriers.attack -= this.equippedArmor.attackBarrierBonus;
    }
    this.equippedArmor = armor;
    this.barriers.attack += armor.attackBarrierBonus;
  }

  equipNewWeapon(weapon: Weapon): void {
    this.equippedWeapon = weapon;
  }

  rest(): void {
    this.currentHealth = this.maxHealth;
    this.isIncapacitated = false;
    this.turnsUntilSpecialAvailableAgain = 0;
  }
}

export class Warrior extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) {
    super(name, gender, race, level, health, skills, weapon, armor);

    this.characterRole = ClassOptions.warrior;
    this.skills.attack += 2;
    this.skills.persuade++;
    this.skills.sneak--;
    this.skills.intelligence--;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/warriorm.png" : "./assets/warriorf.png";
  }

  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 10) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}

export class Ranger extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) {
    super(name, gender, race, level, health, skills, weapon, armor);

    this.characterRole = ClassOptions.ranger;
    this.skills.attack--;
    this.skills.persuade--;
    this.skills.sneak += 2;
    this.skills.intelligence++;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/rangerrm.png" : "./assets/rangerf.png";
  }

  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 8) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}

export class Rouge extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) {
    super(name, gender, race, level, health, skills, weapon, armor);
    this.characterRole = ClassOptions.rouge;
    this.skills.attack++;
    this.skills.persuade--;
    this.skills.sneak += 2;
    this.skills.intelligence--;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/rougem.png" : "./assets/rougef.png";
  }

  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 8) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}

export class Priest extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) {
    super(name, gender, race, level, health, skills, weapon, armor);
    this.characterRole = ClassOptions.warrior;
    this.skills.attack--;
    this.skills.persuade++;
    this.skills.sneak--;
    this.skills.intelligence += 2;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/priestm.png" : "./assets/priestf.png";
  }

  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 6) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}

export const checkRace = (hero: Hero) => {
  switch (hero.race) {
    case RaceOptions.human:
      hero.skills.persuade += 2;
      hero.skills.intelligence++;
      hero.skills.sneak -= 2;
      break;
    case RaceOptions.elf:
      hero.skills.persuade -= 2;
      hero.skills.intelligence += 2;
      hero.skills.sneak++;
      break;
    case RaceOptions.dwarf:
      hero.skills.persuade++;
      hero.skills.intelligence -= 2;
      hero.skills.attack += 2;
      break;
    case RaceOptions.halfling:
      hero.skills.persuade -= 2;
      hero.skills.sneak += 2;
      hero.skills.attack++;
      break;
  }
}
