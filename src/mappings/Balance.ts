import {SubstrateEvent} from "@subql/types";
import {TotalBalance} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleTotalBalance(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;

    let record = await TotalBalance.get(account.toString());

    logger.info("\nRecord: " + record);

    if (record === undefined)
    {
        record = new TotalBalance(account.toString());
        record.totalBalance = BigInt(0);
    }
    
    record.totalBalance = record.totalBalance + (balance as Balance).toBigInt();
    record.account = account.toString();
    
    logger.info("\nAfterUpdateRecord: " + record);

    await record.save();
}
