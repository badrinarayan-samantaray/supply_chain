import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from "../../../declarations/supply_chain_rust_backend/supply_chain_rust_backend.did.js";

const canisterId = u6s2n-gx777-77774-qaaba-cai; 

const agent = new HttpAgent();
const supplyChainActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default supplyChainActor;
