import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from "../../../declarations/supply_chain_rust_backend/supply_chain_rust_backend.did.js";

// ✅ Get canister ID from environment
const canisterId = import.meta.env.VITE_CANISTER_ID_SUPPLY_CHAIN_RUST_BACKEND;

const agent = new HttpAgent();
const supplyChainActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default supplyChainActor;
