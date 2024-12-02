import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ success: boolean; newBalance?: number }>
) {
    if (req.method === "POST") {
        const { gigabytes } = req.body;

        if (!gigabytes || gigabytes <= 0) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({
            success: true,
            newBalance: gigabytes + 10,
        });
    } else {
        res.status(405).json({ success: false });
    }
}
