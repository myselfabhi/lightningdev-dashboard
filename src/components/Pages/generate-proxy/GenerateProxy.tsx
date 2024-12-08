import React from 'react';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
import ConfigureProxy from '../../ConfigureProxy';
import ProxyDetails from '../../ProxyDetails';
import ProxyHeader from '../../ProxyHeader';

const GenerateProxyPage: React.FC = () => {
  const planDetails = {
    planId: '672576d20a6c581e87249045',
    currentPlan: 'Residential 5GB',
    planExpiry: '31 Jun 2025 03:52',
    totalBandwidth: 5,
    usedBandwidth: 1.2,
    remainingBandwidth: 3.8,
  };

  return (
    <DashboardLayout>
      <div className="generate-proxy">
        <ProxyHeader {...planDetails} />
        <ConfigureProxy />
        <ProxyDetails />
      </div>
    </DashboardLayout>
  );
};

export default GenerateProxyPage;
