import { generateBountyAmount, generateCrime, generateCriminalName, generateSpaceCowboyName, getRandomFromArray } from "./nameGenerator";

enum Rank {
  F,
  E,
  D,
  C,
  B,
  A,
  S
}

enum HunterState {
  Idle,
  Hunting,
  Injured,
}


class BountyHunter {
  name: string;
  rank: Rank;
  health: number;
  state: HunterState;
  currentBounty: Bounty | null;
  daysTilBountyFinished: number;
  
  constructor() {
    this.name = generateSpaceCowboyName();
    this.rank = getRandomFromArray(Object.values(Rank));
    this.state = HunterState.Idle;
    this.health = 100;
    this.daysTilBountyFinished = 0;
    this.currentBounty = null;
  }

  getState(): HunterState {
    return this.state;
  }
  
  heal(regenRate: number) {
    this.health = Math.min(100, this.health + regenRate);
    if(this.health == 100)
      this.state = HunterState.Idle;
  }

  progressBounty(): boolean {
    this.daysTilBountyFinished -= 1;
    return this.daysTilBountyFinished <= 0;
  }

  calculateDamage(): number {
    if (!this.currentBounty) {
      return 0;
    }
    const baseDamage = 10;
    const rankDifference = this.currentBounty.rank - this.rank;
    const damage = baseDamage + rankDifference * 15;
    return Math.max(5, Math.min(100, damage));
  }

  finishBounty(perc: number): number {
    if(!this.currentBounty) return 0;

    this.health -= this.calculateDamage();
    if(this.health <= 0) 
      this.health = 1; // So they can heal
    this.state = HunterState.Injured;
    
    const guildCut = this.currentBounty.amount * perc;
    this.currentBounty = null;
    return guildCut;
  }

  dispatch(bounty: Bounty) {
    this.currentBounty = bounty;
    this.state = HunterState.Hunting;
    const rankDifference = bounty.rank - this.rank;
    this.daysTilBountyFinished = Math.max(1, 2 + rankDifference);
  }

}


abstract class Upgradeable {
  rank: Rank
  nextLevelCost: number;

  constructor() {
    this.rank = Rank.F;
    this.nextLevelCost = 50000;
  }
  
  canUpgrade(money: number): boolean {
    return this.nextLevelCost <= money;
  }

  nextLevel() {
    if(this.rank < 6) {
      this.rank += 1;
      this.nextLevelCost *= 2;
      this.upgrade();
    }
    
  }

  isMaxLevel(): boolean {
    return this.rank == Rank.S;
  }

  abstract upgrade(): void;
}


class Barracks extends Upgradeable {
  regenRate: number;
  hunters: BountyHunter[]; 
  maxHunters: number; 

  constructor() {
    super();
    this.regenRate = 5;
    this.maxHunters = 3;
    
    this.hunters = [new BountyHunter(), new BountyHunter(), new BountyHunter()];
  }

  upgrade(): void {
      this.maxHunters += 1;
  }

  getHuntersWithState(state: HunterState): BountyHunter[] {
    return this.hunters.filter(h => h.getState() == state);
  }
  
  getRegenRate(): number {
    return this.regenRate;
  }

  update(): number {
    return 0;
  }

}

class Bounty {
  name: string;
  crime: string;
  amount: number;
  rank: Rank;

  constructor() {
    this.name = generateCriminalName();
    this.crime = generateCrime();
    this.amount = generateBountyAmount();
    this.rank = getRandomFromArray(Object.values(Rank));
  }


}

class BountyBoard extends Upgradeable {
  level: number
  maxBounties: number
  bounties: (Bounty | null)[]
  bountyRefreshPeriod: number;
  daysTilRefresh: number;

  constructor() {
    super();
    this.level = 1;
    this.maxBounties = 4;
    this.bounties = [null, null, null, null];
    this.bountyRefreshPeriod = 4;
    this.daysTilRefresh = this.bountyRefreshPeriod;
    this.genBounties();
  }

  upgrade(): void {
      this.maxBounties += 2;
      this.bounties.push(null, null);  
  }
  
  update() {
    if(this.daysTilRefresh <= 0) {
      this.daysTilRefresh = this.bountyRefreshPeriod;
      this.genBounties();
    } else {
      this.daysTilRefresh -= 1;
    }
  }

  genBounties() {
    for (let i = 0; i < this.bounties.length; i++) {
      if(this.bounties[i] === null) {
        this.bounties[i] = new Bounty();
      }
    }
  }

  getBounty(): Bounty | null {
    const availableBountyIndex = this.bounties.findIndex(b => b !== null);
    if (availableBountyIndex !== -1) {
      const bounty = this.bounties[availableBountyIndex];
      this.bounties[availableBountyIndex] = null;
      if(bounty)
        return bounty;
    }
    return null;
  }
  
}


export class Guild {

  money: number;
  barracks: Barracks;
  bountyBoard: BountyBoard;
  guildPercentage: number;
  
  constructor() {
    this.money = 0;
    this.barracks = new Barracks();
    this.bountyBoard = new BountyBoard();
    this.guildPercentage = 0.2;
  }
  
  

  update() {
    console.log(this);
    for(const hunter of this.barracks.hunters) {
      switch (hunter.getState()) {
        case HunterState.Hunting:
          if(hunter.progressBounty()) {
            this.money += hunter.finishBounty(this.guildPercentage);
          }
          break;
        
        case HunterState.Injured:
          hunter.heal(this.barracks.getRegenRate());
          break;

        case HunterState.Idle: {
          const bounty = this.bountyBoard.getBounty();
          if(bounty !== null)
            hunter.dispatch(bounty);
        } break;
      }
    }

    this.bountyBoard.update(); 
  }



}
