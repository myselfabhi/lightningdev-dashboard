import { NextApiRequest, NextApiResponse } from "next";
import { state } from "./state";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        if (state.isPlanExpired) {
            return res.status(400).json({
                success: false,
                message: "Plan expired. Please renew your plan.",
                balance: 0,
                bandwidthUsed: 0,
            });
        }

        const { usageAmount } = req.body;
        const bandwidthConsumed = 0.01 * 1e9; // 0.01 GB

        if (state.userBalance === 0) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance. Please add funds or renew your plan.",
            });
        }

        // Decrement balance and bandwidth
        state.userBalance = Math.max(0, state.userBalance - usageAmount);
        state.bandwidthUsed = Math.max(0, state.bandwidthUsed - bandwidthConsumed);

        // Mark the plan as expired if both reach zero
        if (state.userBalance === 0 && state.bandwidthUsed === 0) {
            state.isPlanExpired = true;
        }

        res.status(200).json({
            success: true,
            balance: state.userBalance,
            bandwidthUsed: state.bandwidthUsed,
        });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
