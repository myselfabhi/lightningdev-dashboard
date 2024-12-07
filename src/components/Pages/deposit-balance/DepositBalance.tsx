import React from 'react'
import DashboardLayout from '../../DashboardLayout/DashboardLayout'
import DepositBalance from '../../DepositBalance/DepositBalance'

const DepositBalancePage: React.FC = () => {
	return (
		<DashboardLayout>
			<DepositBalance />
		</DashboardLayout>
	)
}

export default DepositBalancePage
