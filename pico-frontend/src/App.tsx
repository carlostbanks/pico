// App.tsx (or any other TypeScript file)
import React, { useEffect, useState } from 'react';
import { getCurrentBlockHeight } from './solanaService';

const App: React.FC = () => {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  useEffect(() => {
    getCurrentBlockHeight().then((slot) => {
      setBlockHeight(slot);
    }).catch((error) => {
      console.error('Failed to fetch block height:', error);
    });
  }, []);

  return (
    <div>
      {blockHeight !== null ? (
        <p>Current block height: {blockHeight}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
