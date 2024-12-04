import React from "react";
import ProxyHeader from "../../components/ProxyHeader";
import ConfigureProxy from "../../components/ConfigureProxy";
import ProxyDetails from "../../components/ProxyDetails";
import "./GenerateProxy.css";

const GenerateProxy: React.FC = () => {
  return (
    <div className="generate-proxy-page container mt-4">
      {/* Header Section */}
      <ProxyHeader />

      {/* Configure Proxy Section */}
      <ConfigureProxy />

      {/* Proxy Details Section */}
      <ProxyDetails />
    </div>
  );
};

export default GenerateProxy;
