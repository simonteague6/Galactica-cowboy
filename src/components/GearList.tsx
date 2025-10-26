// src/components/GearList.tsx

import React from "react";
import type { GearItem } from "../types"; // Import the type

// Define the Props for this component
interface GearListProps {
  gear: GearItem[];
  onToggleEquip: (id: number) => void;
  filterType: string;
}

export const GearList: React.FC<GearListProps> = ({
  gear,
  onToggleEquip,
  filterType,
}) => {
  // Complex filtering logic applied to the list
  const filteredGear = gear.filter(
    (item) => filterType === "All" || item.type === filterType
  );

  return (
    <div>
      <h2>Inventory ({filteredGear.length} Items)</h2>

      {filteredGear.length === 0 && <p>No gear matches the current filter.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredGear.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: item.isEquipped ? "#4CAF5033" : "inherit",
            }}
          >
            <strong>{item.name}</strong> ({item.type})
            <p style={{ margin: "5px 0" }}>{item.description}</p>
            <button onClick={() => onToggleEquip(item.id)}>
              {item.isEquipped ? "Unequip" : "Equip"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
