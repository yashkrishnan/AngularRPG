import {RaceOptions, ClassOptions, GenderOptions} from "./character.options";
import {st} from "@angular/core/src/render3";

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
  isInCapacity: boolean;
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

  constructor(name: string, health: number, skills = {atta})
}
