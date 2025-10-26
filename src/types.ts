// src/types.ts

// The interface for a single gear item
export interface GearItem {
    id: number;
    name: string;
    type: 'Weapon' | 'Utility' | 'Armor' | 'Consumable'; // Use a union type for strict categories
    description: string;
    isEquipped: boolean;
  }
  
  // The interface for the new gear item a user is attempting to add
  export interface NewGearItem {
    name: string;
    type: 'Weapon' | 'Utility' | 'Armor' | 'Consumable' | ''; // Allow empty for initial form state
    description: string;
  }