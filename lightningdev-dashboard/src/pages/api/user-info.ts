import { NextApiRequest, NextApiResponse } from "next";

let isPlanExpired = false;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ username: string; bandwidthUsed: number; balance: number }>
) {
    const remainingBandwidth = isPlanExpired ? 0 : 104857600;

    res.status(200).json({
        username: "testUser",
        bandwidthUsed: remainingBandwidth,
        balance: isPlanExpired ? 0 : 10,
    });
}

// Mock cron logic: Expire plan after 1 minute (simulate CRON job)
setTimeout(() => {
    isPlanExpired = true;
}, 60000);
