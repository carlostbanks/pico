import React, { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// At the top of your MyComponent.tsx file
type TokenInfo = {
    uiAmount: number | null;
    uiAmountString: string;
    mint: string;
  };
  

const MyComponent: FC = () => {
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [solBalance, setSolBalance] = useState<number | null>(null);


  useEffect(() => {
    if (!publicKey) return;
    console.log("Public Key:", publicKey?.toString());

  
    const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
    connection.getBalance(publicKey).then((lamports) => {
        const sol = lamports / LAMPORTS_PER_SOL;
        setSolBalance(sol);
      }).catch(err => console.error(err));
      
  }, [publicKey, connected]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <WalletMultiButton />
        {connected && (
            <div>
            <h3 className="text-lg font-bold">Balances:</h3>
            <p>SOL Balance: {solBalance ? solBalance.toFixed(2) : 'Loading...'}</p>
            <h4 className="text-md font-semibold">Token Balances:</h4>
            <ul>
                {tokens.map((token, index) => (
                <li key={index}>
                    {token.uiAmount} {token.uiAmountString} (Mint: {token.mint})
                </li>
                ))}
            </ul>
            </div>
        )}
    </div>

  );
};

export default MyComponent;
