import {
  ApplyOwnership,
  Claim,
  RugPull,
} from "../generated/templates/Vyper_contract/VestingEscrow";
import { VestingEscrow } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";
import {
  SetOpenClaim,
  Disowned
} from "../generated/templates/VestingEscrowV2/EscrowV2";

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

export function onDisowned(event: Disowned): void {
  const escrowAddress = event.address;

  let escrow = VestingEscrow.load(escrowAddress.toHexString());
  if (!escrow) return;
  escrow.admin = Bytes.fromHexString("0x0000000000000000000000000000000000000000");
  escrow.save();
}

export function onSetOpenClaim(event: SetOpenClaim): void {
  const escrowAddress = event.address;

  let escrow = VestingEscrow.load(escrowAddress.toHexString());
  if (!escrow) return;
  escrow.openClaim = event.params.state;
  escrow.save();
}