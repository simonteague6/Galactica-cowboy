import "./nameGenerator.ts"
import { generateSpaceCowboyName } from "./nameGenerator.ts";


enum Level {
  F,
  E,
  D,
  C,
  B,
  A,
  S
}

enum State {
  Idle,
  Hunting,
  Injured,
}

class BountyHunter {
  name: string;
  hunterLevel: Level;
  health: number;


  constructor(name: string, level: Level, health: number) {
    this.name = name;
    this.hunterLevel = Level.F;
    this.health = 100; 
  }
}

class Bounty {
  name: string;
  crime: string;
  payout: number;

  constructor() {
    this.name = "Stiff Richards";
    this.crime = "Going hard in the burgs";
    this.payout = 1000;
  }
}

abstract class Area {
  level: Level
  
  constructor() {
    this.level = Level.F;
  }

  getLevel(): Level {
    return this.level;
  }
  
  nextLevel() {
    if(this.level < 6)
      this.level += 1
  }

  isMaxLevel(): boolean {
    return this.level == Level.S;
  }

  abstract upgrade(): void; 
  
}



class BountyBoard extends Area {
  maxBounties: number;
  
  bounties: Bounty[];

  constructor() {
    super();
    this.bounties = [];
    
    this.maxBounties = 4;
    
  }

  upgrade(): void {
    this.nextLevel();
    this.maxBounties += 1;
  }


  fillSlots() {
    throw new Error("unimplemented");
  }
}

class Barracks extends Area{
  maxHunters: Map<Level, number>;
  hunters: Map<Level, BountyHunter[]>;
  
  constructor() {
    super()
    this.maxHunters = new Map([
      [Level.F, 2],
      [Level.E, 1],
      [Level.D, 0],
      [Level.C, 0],
      [Level.B, 0],
      [Level.A, 0],
      [Level.S, 0],
    ]);
    
    this.hunters = new Map();
    Object.keys(Level).forEach(level => {this.hunters.set(Number(level), [] as unknown as [BountyHunter])}); 
    
    

  }

  upgrade(): void {
    this.nextLevel();
    if(!this.isMaxLevel()) {
      this
    }  
  }
}

class Infirmary extends Area{
  supplies: number;
  maxRoom: number;
  beds: (BountyHunter | null)[]
  
}

class Guild {
  
  morale: number;
  money: number;
  guildTake: number;
  maxHunterLevel: Level;
  barracks: Barracks;
  bountyBoard: BountyBoard;
  infirmary: Infirmary; 

  constructor() {
    this.money = 1000;
    this.morale = 100;
    this.guildTake = 0.1;
    this.maxHunterLevel = Level.F;
    this.barracks = new Barracks();
    this.bountyBoard = new BountyBoard();
    this.infirmary = new Infirmary();
  }

  doDay() {

  }

  generateHunter(): BountyHunter {
    //TODO: possibly call gemini to get a random recruit IF WE HAVE TIME 
    
    return new BountyHunter(generateSpaceCowboyName(), );
  }

  recruit(hunter: BountyHunter) {
    if(this.barracks.hasRoom(hunter.hunterLevel)) {
      this.barracks.addHunter(hunter);
    } else {
      throw new Error("Tried to add hunter to full barracks.");
    }
  }

  hasInfirmaryRoom(level: Level): boolean {
    return this.infirmary.hasRoom(level);
  }
  
  hasBarracksRoom(level: Level): boolean {
    return this.barracks.hasRoom(level);
  }


  getBarracksLevel(): Level {
    return this.barracks.getLevel();
  }

  getInfirmaryLevel(): Level {
    return this.infirmary.getLevel();
  }


  upgradeInfirmary() {
    this.infirmary.upgrade();
  }

  upgradeBarracks() {
    this.barracks.upgrade();
  }

  upgradeBoard() {
    this.bountyBoard.upgrade();
  }

  getMorale() {
    return this.morale;
  }





}
