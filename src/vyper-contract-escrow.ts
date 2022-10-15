import { ApplyOwnership } from "../generated/templates/Vyper_contract/VestingEscrow";
import { VestingEscrow } from "../generated/schema";

export function onApplyOwnership(event: ApplyOwnership): void {
  const escrowAddress = event.address;
  const newOwner = event.params.admin;

  let escrow = VestingEscrow.load(escrowAddress.toHexString());
  if (!escrow) return;
  escrow.admin = newOwner;
  escrow.save();
}
