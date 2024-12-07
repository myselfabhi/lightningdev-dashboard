import { resetPlan } from "./state";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    resetPlan();
    res.status(200).json({
      success: true,
      balance: 10,
      bandwidthUsed: 0.15 * 1e9,
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
