import { useState, useEffect } from 'react';
import { Guild } from './model';
import './tailwind.css';

// The following enums are defined in model.ts but not exported.
// We are redeclaring them here to make their values accessible.
enum HunterState {
  Idle,
  Hunting,
  Injured,
}

const App = () => {
  const [guild, setGuild] = useState(new Guild());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      guild.update();
      setTick(t => t + 1); // Force re-render
    }, 1000); // Update every second

    return () => clearInterval(gameLoop);
  }, [guild]);

  const getRankString = (rank: any) => ["F", "E", "D", "C", "B", "A", "S"][rank];
  const getHunterStateString = (state: HunterState) => HunterState[state];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold text-yellow-400">Galactica Cowboy</h1>
        <div className="text-2xl font-bold text-green-400 mt-2">
          Guild Funds: ${guild.money.toLocaleString()}
        </div>
      </header>
      <main className="flex flex-row gap-4 p-4">
        {/* Bounty Board */}
        <div className="w-1/2 bg-gray-800 p-4 rounded-lg border-2 border-yellow-400">
          <h2 className="text-2xl font-bold mb-4 text-center">Bounty Board</h2>
          <div className="grid grid-cols-2 gap-4">
            {guild.bountyBoard.bounties.map((bounty, index) =>
              bounty ? (
                <BountyCard key={index} bounty={bounty} />
              ) : (
                <EmptyBountySlot key={index} />
              )
            )}
          </div>
        </div>

        {/* Barracks */}
        <div className="w-1/2 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-4 text-center">Barracks</h2>
          <div className="flex flex-col gap-2">
            {guild.barracks.hunters.map((hunter, index) => (
              <HunterCard 
                key={index} 
                hunter={hunter} 
                getRankString={getRankString} 
                getHunterStateString={getHunterStateString} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const BountyCard = ({ bounty }: { bounty: any }) => (
  <div className="bg-gray-700 p-3 rounded-md border border-gray-600">
    <h3 className="text-xl font-semibold text-red-400">{bounty.name}</h3>
    <p className="text-sm text-gray-400">{bounty.crime}</p>
    <p className="text-lg font-bold text-green-500 mt-2">${bounty.amount.toLocaleString()}</p>
  </div>
);

const EmptyBountySlot = () => (
  <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center min-h-[100px]">
    <span className="text-gray-500">Empty Slot</span>
  </div>
);

const HunterCard = ({ hunter, getRankString, getHunterStateString }: { hunter: any, getRankString: (rank: any) => string, getHunterStateString: (state: HunterState) => string }) => (
  <div className="bg-gray-700 p-3 rounded-md border border-gray-600">
    <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-400">{hunter.name}</h3>
        <span className={`px-2 py-1 text-sm rounded ${
            hunter.state === HunterState.Idle ? 'bg-green-600' :
            hunter.state === HunterState.Hunting ? 'bg-yellow-600' : 'bg-red-600'
        }`}>
            {getHunterStateString(hunter.state)}
        </span>
    </div>
    <div className="flex justify-between mt-2 text-sm">
        <p>Rank: <span className="font-bold">{getRankString(hunter.rank)}</span></p>
        <p>Health: <span className="font-bold">{hunter.health}%</span></p>
    </div>
  </div>
);

export default App;