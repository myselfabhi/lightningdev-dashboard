import { NextApiRequest, NextApiResponse } from "next";

// Simulated state for the user plans
export const state = {
  userBalance: 10, // Initial balance in dollars
  bandwidthUsed: 0, // Bandwidth used in GB
  isPlanExpired: false,
  plans: [
    {
      id: "674cb0b5f674e52455084591",
      name: "Trial-Residential-Plan 0.15 GB",
      dataLeft: 0.15, // in GB
      totalData: 0.15, // in GB
      expires: "Jan 1, 2025", // Expiry date
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Handle GET request to fetch plans
    if (state.isPlanExpired) {
      return res.status(200).json([]);
    }

    return res.status(200).json(state.plans);
  } else if (req.method === "POST") {
    // Handle POST request to simulate plan usage
    if (state.isPlanExpired) {
      return res.status(400).json({
        success: false,
        message: "Plan expired. Please renew your plan.",
      });
    }

    const { usageAmount } = req.body;

    if (!usageAmount || usageAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid usage amount.",
      });
    }

    const plan = state.plans[0]; // Assume the user has one active plan
    const bandwidthConsumed = 0.01; // Simulate bandwidth usage (in GB)

    if (state.userBalance <= 0 || plan.dataLeft <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance or no data left. Please renew your plan.",
      });
    }

    // Deduct balance and data left
    state.userBalance = Math.max(0, state.userBalance - usageAmount);
    plan.dataLeft = Math.max(0, plan.dataLeft - bandwidthConsumed);

    // Check if the plan should be marked as expired
    if (state.userBalance === 0 && plan.dataLeft === 0) {
      state.isPlanExpired = true;
    }

    res.status(200).json({
      success: true,
      balance: state.userBalance,
      bandwidthUsed: plan.totalData - plan.dataLeft,
      dataLeft: plan.dataLeft,
      totalData: plan.totalData,
    });
  } else {
    // Method not allowed
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
