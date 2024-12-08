import React, { useState, useEffect } from 'react'

const Navbar: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [currentDateTime, setCurrentDateTime] = useState('')

	// Toggle Theme
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
	}

	// Update Date and Time
	useEffect(() => {
		const updateTime = () => {
			const now = new Date()
			const date = now.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
			const time = now.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			})
			setCurrentDateTime(`${date} | ${time}`)
		}

		updateTime()
		const intervalId = setInterval(updateTime, 1000) // Update every second

		return () => clearInterval(intervalId) // Cleanup on unmount
	}, [])

	return (
		<div className="container-fluid navbar-wrapper">
			<nav className="navbar-container align-items-center justify-content-between">
				{/* Left Section */}
				<div className="d-flex align-items-center">
					<div className="home-icon">
          <img src="https://lightningproxies.net/assets/images/icons/breadcumb.svg" alt="Home Icon"/>
					</div>
				</div>

				{/* Right Section */}
				<div className="d-flex align-items-center">
					{/* Theme Toggle */}
					<div className="theme-toggle me-3">
						<div className="theme-toggle-container">
							<img src="https://lightningproxies.net/assets/images/icons/moon.svg" alt="Moon Icon" className="theme-icon" />
							<label className="switch">
								<input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
								<span className="slider"></span>
							</label>
							<img src="https://lightningproxies.net/assets/images/icons/sun.svg" alt="Sun Icon" className="theme-icon" />
						</div>
					</div>

					{/* Balance */}
					<div className="balance-container me-3">
						<button className="btn">
							<i className="fas fa-wallet"></i> Balance: $0 
						</button>
					</div>

					{/* Date & Time */}
					<div className="date-time me-3">
						<i className="fas fa-calendar-alt"></i>
						<span>{currentDateTime}</span>
					</div>

					{/* User Profile */}
					<div className="user-profile me-3">
						<button className="btn">
							<i className="fas fa-user"></i> Abhinav_xLWnFL
						</button>
					</div>

					{/* Logout */}
					<div className="logout-icon">
						<button className="btn">
							<i className="fas fa-sign-out-alt"></i>
						</button>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
