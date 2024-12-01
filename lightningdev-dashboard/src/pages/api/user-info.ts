import { NextApiRequest, NextApiResponse } from "next";

type UserInfo = {
  username: string;
  bandwidthUsed: number;
  balance: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo>
) {
  res.status(200).json({
    username: "testUser",
    bandwidthUsed: 104857600, // 100 MB in bytes
    balance: 10, // in GB
  });
}