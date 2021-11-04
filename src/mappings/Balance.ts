import {SubstrateEvent} from "@subql/types";
import {TotalBalance} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleTotalBalance(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;

    let record = await TotalBalance.get(account.toString());

    if (record === undefined)
    {
        record = new TotalBalance(account.toString());
        record.totalBalance = BigInt(0);
    }

    record.account = account.toString();
    record.totalBalance = record.totalBalance + (balance as Balance).toBigInt();
    
    await record.save();
}
