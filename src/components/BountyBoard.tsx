// src/components/BountyBoard.tsx

import React, { useState } from 'react';

// 1. Define the type for a single Bounty item
interface Bounty {
  id: string; // Unique identifier for each bounty
  name: string;
  crime: string;
  reward: number; // Storing as a number for potential calculations
}

const BountyBoard: React.FC = () => {
  // 2. State for the list of bounties
  const [bounties, setBounties] = useState<Bounty[]>([]);

  // 3. State for the form input fields
  const [bountyName, setBountyName] = useState<string>('');
  const [crimeCommitted, setCrimeCommitted] = useState<string>('');
  const [bountyReward, setBountyReward] = useState<string>(''); // Keep as string for input, convert to number on add

  // 4. Function to handle adding a new bounty
  const handleAddBounty = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!bountyName || !crimeCommitted || !bountyReward) {
      alert('Please fill in all bounty details.');
      return;
    }

    const newBounty: Bounty = {
      id: Math.random().toString(36).substr(2, 9), // Simple unique ID
      name: bountyName,
      crime: crimeCommitted,
      reward: parseFloat(bountyReward), // Convert reward to a number
    };

    setBounties([...bounties, newBounty]); // Add new bounty to the list

    // Clear the form fields
    setBountyName('');
    setCrimeCommitted('');
    setBountyReward('');
  };

  // 5. Function to handle "collecting" (removing) a bounty
  const handleCollectBounty = (id: string) => {
    setBounties(bounties.filter(bounty => bounty.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Galactic Bounty Board ({bounties.length} Bounties)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Add New Bounty Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Post New Bounty</h2>
          <form onSubmit={handleAddBounty} className="space-y-4">
            <div>
              <label htmlFor="bountyName" className="block text-sm font-medium text-gray-700">
                Target Name (e.g., "Jax 'The Shadow' Varkos")
              </label>
              <input
                type="text"
                id="bountyName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={bountyName}
                onChange={(e) => setBountyName(e.target.value)}
                placeholder="Target Name"
              />
            </div>
            <div>
              <label htmlFor="crime" className="block text-sm font-medium text-gray-700">
                Crime Committed (e.g., "Grand Theft Starship")
              </label>
              <input
                type="text"
                id="crime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={crimeCommitted}
                onChange={(e) => setCrimeCommitted(e.target.value)}
                placeholder="Crime Committed"
              />
            </div>
            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-gray-700">
                Reward (Credits)
              </label>
              <input
                type="number" // Use type="number" for numeric input
                id="reward"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={bountyReward}
                onChange={(e) => setBountyReward(e.target.value)}
                placeholder="e.g., 10000"
                min="0" // Ensure reward is not negative
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Post Bounty
            </button>
          </form>
        </div>

        {/* Right Column: List of Bounties */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Active Bounties ({bounties.length})</h2>
          <div className="space-y-3">
            {bounties.length === 0 ? (
              <p className="text-gray-500 italic">No bounties posted yet. Add one!</p>
            ) : (
              bounties.map((bounty) => (
                <div key={bounty.id} className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">{bounty.name}</h3>
                  <p className="text-sm text-red-700 mb-1">Crime: {bounty.crime}</p>
                  <p className="text-md text-green-600 font-semibold mb-2">Reward: {bounty.reward.toLocaleString()} Credits</p>
                  <button
                    onClick={() => handleCollectBounty(bounty.id)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Collect Bounty
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600">
        Your bounty components will go here, stacked on top of each other.
        <br />
        For example, a list or a set of cards.
      </p>
    </div>
  );
};

export default BountyBoard;