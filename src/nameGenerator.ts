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

// 2. Helper function to get a random item from an array
function getRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 3. Create the generator function
export function generateSpaceCowboyName(): string {
  // Combine the parts in different ways
  const pattern = Math.random();

  if (pattern > 0.7) {
    // Pattern 1: Title + Descriptor + LastName
    // e.g., "Marshal Dusty Blackwood"
    return `${getRandom(titles)} ${getRandom(descriptors)} ${getRandom(lastNames)}`;
  } else if (pattern > 0.4) {
    // Pattern 2: Descriptor + FirstName + LastName
    // e.g., "Star Spike McCoy"
    return `${getRandom(descriptors)} ${getRandom(firstNames)} ${getRandom(lastNames)}`;
  } else {
    // Pattern 3: FirstName "The" Descriptor + LastName
    // e.g., "Jet 'The Void' Stryker"
    return `${getRandom(firstNames)} 'The ${getRandom(descriptors)}' ${getRandom(lastNames)}`;
  }
}


export function generateCriminalName(): string {
  // Combine the parts in different ways
  const pattern = Math.random();

  if (pattern > 0.7) {
    // Pattern 1: Title + Descriptor + LastName
    // e.g., "Marshal Dusty Blackwood"
    return `${getRandom(titles)} ${getRandom(descriptors)} ${getRandom(lastNames)}`;
  } else if (pattern > 0.4) {
    // Pattern 2: Descriptor + FirstName + LastName
    // e.g., "Star Spike McCoy"
    return `${getRandom(descriptors)} ${getRandom(firstNames)} ${getRandom(lastNames)}`;
  } else {
    // Pattern 3: FirstName "The" Descriptor + LastName
    // e.g., "Jet 'The Void' Stryker"
    return `${getRandom(firstNames)} 'The ${getRandom(descriptors)}' ${getRandom(lastNames)}`;
  }

}
