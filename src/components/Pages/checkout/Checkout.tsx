import { useRouter } from 'next/router'
import React from 'react'
import DashboardLayout from '../../DashboardLayout/DashboardLayout'

const CheckoutPage: React.FC = () => {
	const router = useRouter()
	const { name, bandwidth, price, duration, threads } = router.query

	const handlePay = () => {
		// Add payment logic here
		console.log('Payment initiated for', name)
	}

	return (
		<DashboardLayout>
			<div className="checkout-container">
				<h3>Checkout</h3>
				<p>Proceed to pay for your selected plan</p>
				<div className="plan-details">
					<h4>{name}</h4>
					<p>
						<strong>Bandwidth:</strong> {bandwidth} GB
					</p>
					<p>
						<strong>Duration:</strong> {duration}
					</p>
					<p>
						<strong>Threads:</strong> {threads}
					</p>
					<p>
						<strong>Price:</strong> ${price}
					</p>
				</div>
				<input type="text" placeholder="Enter coupon code" />
				<button className="btn btn-secondary button">Apply</button>
				<button className="btn btn-primary mt-3 button" onClick={handlePay}>
					Pay ${price}
				</button>
			</div>
		</DashboardLayout>
	)
}

export default CheckoutPage
