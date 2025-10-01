// src/utils/uploadToIPFS.ts
import { Web3Storage } from 'web3.storage';

export function getAccessToken() {
  return process.env.REACT_APP_WEB3_STORAGE_TOKEN;
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken()! });
}

export async function storeFile(file: File): Promise<string> {
  const client = makeStorageClient();
  const cid = await client.put([file]);
  return cid; // Use this to link in smart contract
}