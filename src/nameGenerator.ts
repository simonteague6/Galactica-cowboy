// /src/utils/nameGenerator.js

// 1. Create your word lists
const titles = [
  "Captain", "Cadet", "Duke", "Spacer", "Marshal", "Outlaw", "Sheriff", "Deputy",
];

const descriptors = [
  "Dusty", "Rusty", "Zero-G", "Star", "Chrome", "Iron", "Void", "Solar", "Wily",
];

const firstNames = [
  "Jet", "Spike", "Faye", "Buck", "Cassidy", "Wren", "Silas", "Cade", "Nova",
];

const lastNames = [
  "Blackwood", "McCoy", "Orion", "Ryder", "Stryker", "Valerius", "Kowalski",
];

// 3. Create your word lists
const aliases = [
  "Spike", "Vex", "Wraith", "Blaze", "Grit", "Rook", "Jax", "Silas", "Cade", "Cyra",
];

const epithets = [ // "The Nickname"
  "Dredge", "Volkov", "Ryker", "Corvus", "'Scrap-hand'", "'The Void'", "'Iron-Jaw'",
  "'One-Eye'", "'The Ghost'", "Black", "Kane",
];

const crimes = [
  "Spice Smuggling",
  "Xeno-Artifact Trafficking",
  "Claim Jumping",
  "Corporate Data-Heist",
  "Starship Piracy",
  "Bypassing Fed-Com Tariffs",
  "Illegal Droid Modding",
  "Arms Dealing",
];

export function generateCriminalName() {
 return `${getRandomFromArray(aliases)} ${getRandomFromArray(epithets)}`;
}

export function generateBountyAmount() {
  // Generates a random "round" number, e.g., 10,000, 75,000, 250,000
  const baseBounties = [5000, 10000, 25000, 50000, 75000, 100000, 250000];
  const multiplier = Math.floor(Math.random() * 5) + 1; // 1 to 5
  return getRandomFromArray(baseBounties) * multiplier;
}

export function generateCrime() {
  return getRandomFromArray(crimes);
}


// 2. Helper function to get a random item from an array
export function getRandomFromArray(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 3. Create the generator function
export function generateSpaceCowboyName(): string {
  // Combine the parts in different ways
  const pattern = Math.random();

  if (pattern > 0.7) {
    // Pattern 1: Title + Descriptor + LastName
    // e.g., "Marshal Dusty Blackwood"
    return `${getRandomFromArray(titles)} ${getRandomFromArray(descriptors)} ${getRandomFromArray(lastNames)}`;
  } else if (pattern > 0.4) {
    // Pattern 2: Descriptor + FirstName + LastName
    // e.g., "Star Spike McCoy"
    return `${getRandomFromArray(descriptors)} ${getRandomFromArray(firstNames)} ${getRandomFromArray(lastNames)}`;
  } else {
    // Pattern 3: FirstName "The" Descriptor + LastName
    // e.g., "Jet 'The Void' Stryker"
    return `${getRandomFromArray(firstNames)} 'The ${getRandomFromArray(descriptors)}' ${getRandomFromArray(lastNames)}`;
  }
}
