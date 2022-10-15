import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { VestingEscrowCreated } from "../generated/Vyper_contract/Vyper_contract"

export function createVestingEscrowCreatedEvent(
  funder: Address,
  token: Address,
  recipient: Address,
  escrow: Address,
  amount: BigInt,
  vesting_start: BigInt,
  vesting_duration: BigInt,
  cliff_length: BigInt
): VestingEscrowCreated {
  let vestingEscrowCreatedEvent = changetype<VestingEscrowCreated>(
    newMockEvent()
  )

  vestingEscrowCreatedEvent.parameters = new Array()

  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam("escrow", ethereum.Value.fromAddress(escrow))
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "vesting_start",
      ethereum.Value.fromUnsignedBigInt(vesting_start)
    )
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "vesting_duration",
      ethereum.Value.fromUnsignedBigInt(vesting_duration)
    )
  )
  vestingEscrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cliff_length",
      ethereum.Value.fromUnsignedBigInt(cliff_length)
    )
  )

  return vestingEscrowCreatedEvent
}
