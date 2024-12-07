import React from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import DepositBalance from '../../components/DepositBalance/DepositBalance'

const DepositBalancePage: React.FC = () => {
	return (
		<DashboardLayout>
			<DepositBalance />
		</DashboardLayout>
	)
}

export default DepositBalancePage
