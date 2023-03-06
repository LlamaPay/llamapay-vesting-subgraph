import {
  ApplyOwnership,
  Claim,
  RugPull,
} from "../generated/templates/Vyper_contract/VestingEscrow";
import { VestingEscrow } from "../generated/schema";

export function onApplyOwnership(event: ApplyOwnership): void {
  const escrowAddress = event.address;
  const newOwner = event.params.admin;

  let escrow = VestingEscrow.load(escrowAddress.toHexString());
  if (!escrow) return;
  escrow.admin = newOwner;
  escrow.save();
}

export function onClaim(event: Claim): void {
  const escrowAddress = event.address;
  const claimed = event.params.claimed;

  let escrow = VestingEscrow.load(escrowAddress.toHexString())!;
  escrow.totalClaimed = escrow.totalClaimed.plus(claimed);
  escrow.save();
}

export function onRugPull (event: RugPull):void {
  const escrowAddress = event.address;
  let escrow = VestingEscrow.load(escrowAddress.toHexString())!;
  escrow.disabledAt = event.block.timestamp;
  escrow.save();
}
