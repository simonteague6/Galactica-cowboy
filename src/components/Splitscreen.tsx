import Game from '../Game';
// Import your components here
// import BountyList from './BountyList';
// import HunterProfile from './HunterProfile';

const SplitScreen = () => {
  return (
    // The grid layout is perfect. This doesn't need to change.
    <div className="grid grid-cols-2 h-screen">
      
      {/* --- Left Pane (Bounties) --- */}
      {/* We add 'overflow-y-auto' for scrolling when content is too tall */}
      <div className="bg-gray-100 overflow-y-auto">
        
        {/* This inner div adds padding and holds your content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bounties
          </h2>
          
          {/* === YOUR BOUNTY COMPONENTS GO HERE === */}
          <Game></Game>
          {/* <BountyList /> */}
          {/* <SomeOtherComponent /> */}
          <div className="text-gray-700">
            <p>Your bounty components will go here, stacked on top of each other.</p>
            <p className="mt-4">For example, a list or a set of cards.</p>
          </div>
          {/* <BountyList /> */}
          
        </div>
      </div>

      {/* --- Right Pane (Bounty Hunters) --- */}
      <div className="bg-gray-900 text-gray-100 overflow-y-auto">
        
        {/* Inner content container */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">
            Bounty Hunters
          </h2>

          {/* === YOUR BOUNTY HUNTER COMPONENTS GO HERE === */}
          {/* <HunterProfile /> */}
          {/* <HunterList /> */}
          <div>
            <p>Your bounty hunter components will go here.</p>
            <p className="mt-4">This side will scroll independently if its content is too long.</p>
          </div>
          {/* <HunterProfile /> */}

        </div>
      </div>

    </div>
  );
};

export default SplitScreen;