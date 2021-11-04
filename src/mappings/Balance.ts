import {SubstrateEvent} from "@subql/types";
import {TotalBalance} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleTotalBalance(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;

    let record = await TotalBalance.get(event.extrinsic.block.block.header.hash.toString());

    if (record === undefined)
        record = new TotalBalance(event.extrinsic.block.block.header.hash.toString());
    
    record.totalBalance = record.totalBalance + (balance as Balance).toBigInt();
    record.account = account.toString();
    
    await record.save();
}
