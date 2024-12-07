import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardsSection from '../../CardsSection/CardsSection'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import PlanSection from '../../PlanSection/PlanSection'
import Sidebar from '../../Sidebar/Sidebar'

const DashboardPage: React.FC = () => {
	const [userInfo, setUserInfo] = useState({
		balance: 0,
		activePlans: 0,
		dataLeft: 0,
		totalDataPurchased: 0,
		username: 'Loading...',
		userId: ''
	})

	// Fetch user info
	const fetchUserInfo = async () => {
		try {
			const response = await axios.get('/api/user-info')
			console.log('Fetched user info after renew/add:', response.data) // Debugging log
			setUserInfo({
				balance: response.data.balance || 0,
				activePlans: response.data.activePlans || 0,
				dataLeft: response.data.dataLeft || 0,
				totalDataPurchased: response.data.totalDataPurchased || 0,
				username: response.data.username || 'Guest',
				userId: response.data.userId || ''
			})
		} catch (error) {
			console.error('Error fetching user info:', error)
		}
	}

	// Add balance
	const renewPlan = async () => {
		console.log('Renew Plan button clicked')
		try {
			const response = await axios.post('/api/renew-plan')
			console.log('Renew Plan Response:', response.data)
			if (response.data.success) {
				await fetchUserInfo() // Refresh state
			} else {
				console.error('Failed to renew plan:', response.data.message)
			}
		} catch (error) {
			console.error('Error renewing plan:', error)
		}
	}

	const addBalance = async () => {
		console.log('Add Balance button clicked') // Debugging log
		try {
			const response = await axios.post('/api/add-balance', { amount: 10 })
			console.log('Add Balance Response:', response.data) // Debugging log
			if (response.data.success) {
				await fetchUserInfo() // Refresh state
			} else {
				console.error('Failed to add balance:', response.data.message)
			}
		} catch (error) {
			console.error('Error adding balance:', error)
		}
	}

	// Fetch user info on component mount
	useEffect(() => {
		fetchUserInfo()
	}, [])

	return (
		<div className="dashboard-layout">
			{/* Sidebar */}
			<Sidebar />

			{/* Right Section */}
			<div className="dashboard-right-section">
				{/* Navbar */}
				<Navbar />

				{/* Main Content */}
				<div className="dashboard-content">
					<CardsSection
						addBalance={addBalance}
						renewPlan={renewPlan}
						fetchUserInfo={fetchUserInfo}
						balance={userInfo.balance}
						activePlans={userInfo.activePlans}
						dataLeft={userInfo.dataLeft}
						totalDataPurchased={userInfo.totalDataPurchased}
						username={userInfo.username}
						userId={userInfo.userId}
					/>

					<PlanSection />
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
