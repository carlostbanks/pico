import React, { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const MyComponent: FC = () => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    const connection = new Connection(clusterApiUrl('devnet')); // Use 'mainnet-beta' for production
    connection.getBalance(publicKey).then((lamports) => {
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      setBalance(lamports / 1e9);
    });
  }, [publicKey, connected]);

  return (
    <div className="flex justify-center items-center h-screen">
        <WalletMultiButton />
      {connected && balance !== null ? (
        <p>Balance: {balance} SOL</p>
      ) : null}
    </div>
  );
};

export default MyComponent;
