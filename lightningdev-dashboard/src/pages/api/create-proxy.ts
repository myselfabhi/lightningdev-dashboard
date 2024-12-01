import { NextApiRequest, NextApiResponse } from "next";

type ProxyResponse = {
  success: boolean;
  proxyId?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProxyResponse>
) {
  if (req.method === "POST") {
    res.status(201).json({ success: true, proxyId: "proxy123" });
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
