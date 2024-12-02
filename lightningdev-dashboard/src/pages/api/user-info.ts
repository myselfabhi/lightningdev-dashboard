import { NextApiRequest, NextApiResponse } from "next";
import { state } from "./state";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        username: "testUser",
        bandwidthUsed: state.isPlanExpired ? 0 : state.bandwidthUsed,
        balance: state.isPlanExpired ? 0 : state.userBalance,
    });

    // Automatically mark the plan as expired if both balance and bandwidth are zero
    if (state.userBalance === 0 && state.bandwidthUsed === 0) {
        state.isPlanExpired = true;
    }
}
