import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { planId } = req.query

	if (!planId) {
		return res.status(400).json({ error: 'Plan ID is required' })
	}

	// Return dummy proxy details for now
	res.status(200).json({
		planId,
		proxyHost: 'proxy.example.com',
		proxyPort: 8080,
		username: 'user123',
		password: 'pass123'
	})
}
