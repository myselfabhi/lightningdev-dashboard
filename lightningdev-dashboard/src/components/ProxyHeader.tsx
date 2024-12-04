import React from "react";
import "./ProxyHeader.css";

type ProxyHeaderProps = {
  planId: string;
  currentPlan: string;
  planExpiry: string;
  totalBandwidth: number; // in GB
  usedBandwidth: number; // in GB
  remainingBandwidth: number; // in GB
};

const ProxyHeader: React.FC<ProxyHeaderProps> = ({
  planId,
  currentPlan,
  planExpiry,
  totalBandwidth,
  usedBandwidth,
  remainingBandwidth,
}) => {
  const progress = (usedBandwidth / totalBandwidth) * 100;

  return (
    <div className="proxy-header d-flex justify-content-between align-items-center mb-4">
      <div className="plan-info">
        <p>Plan ID: {planId}</p>
        <h4>Current Plan: {currentPlan}</h4>
        <p>Plan Expiry: {planExpiry}</p>
        <button className="btn btn-primary me-2">Plan Settings</button>
        <button className="btn btn-outline-secondary">Auto Renew</button>
      </div>
      <div className="bandwidth-info">
        <h4>Total Bandwidth: {totalBandwidth} GB</h4>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progress.toFixed(0)}%
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p>Used Bandwidth: {usedBandwidth.toFixed(2)} GB</p>
          <p>Remaining Bandwidth: {remainingBandwidth.toFixed(2)} GB</p>
        </div>
        <div className="add-bandwidth d-flex align-items-center">
          <input type="number" className="form-control" placeholder="0" />
          <button className="btn btn-success ms-2">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProxyHeader;
