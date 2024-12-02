import { state } from "./state";
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { amount } = req.body;

        if (state.isPlanExpired) {
            return res.status(400).json({
                success: false,
                message: "Cannot add balance to an expired plan. Please renew your plan.",
            });
        }

        state.userBalance += amount;

        res.status(200).json({
            success: true,
            newBalance: state.userBalance,
        });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
