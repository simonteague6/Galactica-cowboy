// src/App.tsx

import React, { useState, useMemo } from "react";
import type { GearItem, NewGearItem } from "./types"; // Import types
import { AddItemForm } from "./components/AddItemForm"; // Import components
import { GearList } from "./components/GearList";
import "./App.css";

// 1. COMPLEX INITIAL STATE: Define a fully typed starting array
const initialGear: GearItem[] = [
  {
    id: 1,
    name: "Lever-Action Laser Rifle",
    type: "Weapon",
    description: "A classic design with a modern kick.",
    isEquipped: true,
  },
  {
    id: 2,
    name: "Durasteel Duster",
    type: "Armor",
    description: "Light armor for dusty planets.",
    isEquipped: true,
  },
  {
    id: 3,
    name: "Astro-Stim Pack",
    type: "Consumable",
    description: "Instant stamina boost.",
    isEquipped: false,
  },
];

function App() {
  // 2. COMPLEX STATE MANAGEMENT: State for the gear list
  const [gearList, setGearList] = useState<GearItem[]>(initialGear);

  // 3. SECONDARY STATE: State for filtering
  const [filter, setFilter] = useState("All");

  // 4. BUSINESS LOGIC: Function to add new gear
  const handleAddItem = (newItem: NewGearItem) => {
    const newGear: GearItem = {
      ...newItem,
      id: Date.now(), // Simple ID generation
      isEquipped: false,
    };
    // Type-safe state update
    setGearList((prevList) => [...prevList, newGear]);
  };

  // 5. BUSINESS LOGIC: Function to toggle equipment status
  const handleToggleEquip = (id: number) => {
    setGearList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isEquipped: !item.isEquipped } : item
      )
    );
  };

  // 6. PERFORMANCE OPTIMIZATION (useMemo): Prevents filtering logic from running on every non-relevant render
  const gearCount = useMemo(() => gearList.length, [gearList]);

  return (
    <div className="app-container">
      <h1>Space Freighter Inventory Terminal ({gearCount} items)</h1>
      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* Filter UI */}
        <div>
          <strong>Filter by Type: </strong>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="All">All</option>
            <option value="Weapon">Weapon</option>
            <option value="Utility">Utility</option>
            <option value="Armor">Armor</option>
            <option value="Consumable">Consumable</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "50px" }}>
        {/* Child Component 1: Handles adding items */}
        <AddItemForm onAddItem={handleAddItem} />

        {/* Child Component 2: Handles displaying and interacting with the list */}
        <GearList
          gear={gearList}
          onToggleEquip={handleToggleEquip}
          filterType={filter}
        />
      </div>
    </div>
  );
}

export default App;
