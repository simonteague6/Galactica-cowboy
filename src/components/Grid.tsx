import React from 'react';

const SplitScreen = () => {
  return (
    // Main container:
    // - "grid": Establishes a grid layout
    // - "grid-cols-2": Creates two equal-width columns
    // - "h-screen": Sets the height to 100% of the viewport height
    <div className="grid grid-cols-2 h-screen">
      
      {/* Left Pane */}
      <div className="flex justify-center items-center bg-gray-100 text-gray-900">
        <h2 className="text-3xl font-bold">
          bounties
        </h2>
      </div>

      {/* Right Pane */}
      <div className="flex justify-center items-center bg-gray-900 text-gray-100">
        <h2 className="text-3xl font-bold">
          bounty hunters
        </h2>
      </div>

    </div>
  );
};

export default SplitScreen;