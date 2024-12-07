import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

type LayoutProps = {
	children: React.ReactNode
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="layout-container">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="main-content-wrapper">
				{/* Navbar */}
				<Navbar />

				{/* Page Content */}
				<main className="main-content">{children}</main>

				{/* Footer */}
				<Footer />
			</div>
		</div>
	)
}

export default DashboardLayout
