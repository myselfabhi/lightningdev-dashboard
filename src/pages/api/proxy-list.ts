import { NextApiRequest, NextApiResponse } from 'next'

type ProxyList = {
	countryCodes: string[]
	zones: {
		static: string[]
		dynamic: string[]
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ProxyList>) {
	res.status(200).json({
		countryCodes: ['US', 'IN', 'UK', 'DE'],
		zones: {
			static: ['zone1', 'zone2'],
			dynamic: ['zone3', 'zone4']
		}
	})
}
