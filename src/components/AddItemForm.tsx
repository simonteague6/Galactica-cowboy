// src/components/AddItemForm.tsx

import React, { useState } from "react";
import type { NewGearItem } from "../types"; // Import the type
// Import the type

// Define the Props for this component
interface AddItemFormProps {
  onAddItem: (item: NewGearItem) => void;
}

const initialFormState: NewGearItem = {
  name: "",
  type: "", // Will default to the empty string in the select input
  description: "",
};

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [formData, setFormData] = useState<NewGearItem>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.type) {
      onAddItem(formData);
      setFormData(initialFormState); // Reset form after submission
    } else {
      alert("Must provide a Name and a Type!");
    }
  };

  return (
    <div className="form-container">
      <h3>Add New Gear to the Ship's Manifest</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "10px", maxWidth: "300px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Gear Name (e.g., Plasma Revolver)"
          value={formData.name}
          onChange={handleChange}
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="" disabled>
            Select Gear Type
          </option>
          <option value="Weapon">Weapon</option>
          <option value="Utility">Utility</option>
          <option value="Armor">Armor</option>
          <option value="Consumable">Consumable</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Log Gear</button>
      </form>
    </div>
  );
};
