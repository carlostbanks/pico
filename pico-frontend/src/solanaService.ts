import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');

export async function getCurrentBlockHeight(): Promise<number> {
  try {
    const slot = await connection.getSlot();
    return slot;
  } catch (error) {
    console.error('Error querying block height:', error);
    throw error;
  }
}
