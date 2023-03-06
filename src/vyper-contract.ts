import { BigInt } from "@graphprotocol/graph-ts";
import { VestingFactory, VestingEscrow, Token } from "../generated/schema";
import { VestingEscrowCreated } from "../generated/templates/Vyper_contract/VestingFactory";
import { ERC20 } from "../generated/Vyper_contract/ERC20";

export function onVestingEscrowCreated(event: VestingEscrowCreated): void {
  const factoryAddress = event.address;
  const tokenAddress = event.params.token;
  const escrowAddress = event.params.escrow;

  let factory = VestingFactory.load(factoryAddress.toHexString());
  if (factory === null) {
    factory = new VestingFactory(factoryAddress.toHexString());
    factory.factory = factoryAddress;
    factory.count = 0;
  }

  let token = Token.load(tokenAddress.toHexString());
  if (token === null) {
    token = new Token(tokenAddress.toHexString());
    const erc20 = ERC20.bind(tokenAddress);
    token.address = tokenAddress;
    token.symbol = erc20.try_symbol().value;
    token.name = erc20.try_name().value;
    token.decimals = erc20.try_decimals().value;
  }

  let escrow = new VestingEscrow(escrowAddress.toHexString());
  escrow.factory = factory.id;
  escrow.admin = event.params.funder;
  escrow.token = token.id;
  escrow.recipient = event.params.recipient;
  escrow.escrow = event.params.escrow;
  escrow.amount = event.params.amount;
  escrow.start = event.params.vesting_start;
  escrow.end = event.params.vesting_start.plus(event.params.vesting_duration);
  escrow.totalLocked = event.params.amount;
  escrow.totalClaimed = new BigInt(0);
  escrow.duration = event.params.vesting_duration;
  escrow.cliff = event.params.cliff_length;

  factory.count += 1;

  factory.save();
  token.save();
  escrow.save();
}

