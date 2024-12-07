import React from 'react'
import { Circle } from 'rc-progress'
import { Home, Calendar, Database } from 'lucide-react'

type ProxyHeaderProps = {
	planId: string
	currentPlan: string
	planExpiry: string
	totalBandwidth: number // in GB
	usedBandwidth: number // in GB
	remainingBandwidth: number // in GB
}

const ProxyHeader: React.FC<ProxyHeaderProps> = ({ planId, currentPlan, planExpiry, totalBandwidth, usedBandwidth, remainingBandwidth }) => {
	const progress = (usedBandwidth / totalBandwidth) * 100

	return (
		<div className="proxy-header-container">
			{/* Header with Need Support and Contact Us */}
			<div className="proxy-header-top d-flex justify-content-between align-items-center mb-3">
				<div>
					<h4>Generate Proxy</h4>
					<p className="plan-id">Plan ID: {planId}</p>
				</div>
				<div>
					<span className="support-text me-2">Need Support?</span>
					<button className="btn btn-primary">Contact Us</button>
				</div>
			</div>

			{/* First Layer */}
			<div className="d-flex gap-3 mb-4">
				{/* First Card */}
				<div className="card shadow-sm p-3 flex-grow-1 position-relative">
					<div className="icon-container mb-2">
						<Home size={20} className="icon" />
					</div>
					<p className="card-title">Current Plan</p>
					<h5>{currentPlan}</h5>
					<button className="btn btn-outline-primary btn-sm plan-settings-btn position-absolute">Plan Settings</button>
				</div>

				{/* Second Card */}
				<div className="card shadow-sm p-3 flex-grow-1">
					<div className="icon-container mb-2">
						<Calendar size={20} className="icon" />
					</div>
					<p className="card-title">Plan Expiry</p>
					<h5>{planExpiry}</h5>
				</div>
			</div>

			{/* Bandwidth Information Card */}
			<div className="card shadow-sm p-4">
				<div className="d-flex align-items-center">
					{/* Total Bandwidth Info */}
					<div className="bandwidth-info me-4">
						<div className="icon-container mb-2">
							<Database size={20} className="icon" />
						</div>
						<p className="card-title">Total Bandwidth</p>
						<h5>{totalBandwidth.toFixed(2)} GB</h5>
					</div>

					{/* Vertical Separator */}
					<div className="vertical-line"></div>

					{/* Circular Progress */}
					<div className="progress-circle me-4">
						<Circle percent={progress} strokeWidth={8} strokeColor="#007bff" trailColor="#e9ecef" />
						<div className="progress-text">{`${progress.toFixed(0)}%`}</div>
					</div>

					{/* Bandwidth Points */}
					<div className="bandwidth-summary me-4">
						<div className="d-flex align-items-center mb-2">
							<span className="dot used-dot me-2"></span>
							<p className="mb-0">Used Bandwidth</p>
						</div>
						<div className="d-flex align-items-center">
							<span className="dot remaining-dot me-2"></span>
							<p className="mb-0">Remaining Bandwidth</p>
						</div>
						<div className="add-bandwidth align-items-center">
							<p className="mb-0">Add Bandwidth</p>
							<input type="number" className="form-control add-bandwidth-input" placeholder="0" />

							{/* <span className="ms-2">GB</span> */}
						</div>
					</div>

					{/* Values at Right End */}
					<div className="bandwidth-values text-end">
						<p className="mb-2">{usedBandwidth.toFixed(2)} GB</p>
						<p>{remainingBandwidth.toFixed(2)} GB</p>
						<p>
							<button className="btn btn-primary ms-3 add-button">Add &gt;</button>
						</p>
					</div>

					{/* Add Bandwidth Section */}
					<div className="add-bandwidth d-flex align-items-center ms-auto"></div>
				</div>
			</div>
		</div>
	)
}

export default ProxyHeader
