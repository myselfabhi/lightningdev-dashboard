import React from "react";
import Layout from "../../components/Layout/Layout";
import ConfigureProxy from "../../components/ConfigureProxy";
import ProxyDetails from "../../components/ProxyDetails";
import ProxyHeader from "../../components/ProxyHeader";

const GenerateProxy: React.FC = () => {
  const planDetails = {
    planId: "672576d20a6c581e87249045",
    currentPlan: "Residential 5GB",
    planExpiry: "31 Jun 2025 03:52",
    totalBandwidth: 5,
    usedBandwidth: 1.2,
    remainingBandwidth: 3.8,
  };

  return (
    <Layout>
      <div className="generate-proxy-container">
        <ProxyHeader {...planDetails} />
        <ConfigureProxy />
        <ProxyDetails />
      </div>
    </Layout>
  );
};

export default GenerateProxy;
