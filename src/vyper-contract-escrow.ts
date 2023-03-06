import {
  ApplyOwnership,
  Claim,
  RugPull,
} from "../generated/templates/Vyper_contract/VestingEscrow";
import { VestingEscrow } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

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

  let escrow = VestingEscrow.load(escrowAddress.toHexString())!;
  const oldclaimed = escrow.totalClaimed;
  escrow.totalClaimed = event.params.claimed.plus(oldclaimed);
  escrow.save();
}

export function onRugPull(event: RugPull): void {
  const escrowAddress = event.address;
  let escrow = VestingEscrow.load(escrowAddress.toHexString())!;
  escrow.disabledAt = event.block.timestamp;
  escrow.save();
}
