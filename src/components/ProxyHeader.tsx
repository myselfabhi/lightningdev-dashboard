import React, { useState } from 'react';
import { Circle } from 'rc-progress';
import styles from './ProxyHeader.module.css';

type ProxyHeaderProps = {
  planId: string;
  currentPlan: string;
  planExpiry: string;
  totalBandwidth: number; // in GB
  usedBandwidth: number; // in GB
  remainingBandwidth: number; // in GB
  addGigabytes: (gb: number) => void; // Function for Add Bandwidth button
};

const ProxyHeader: React.FC<ProxyHeaderProps> = ({
  planId,
  currentPlan,
  planExpiry,
  totalBandwidth,
  usedBandwidth,
  remainingBandwidth,
  addGigabytes,
}) => {
  const progress = (usedBandwidth / totalBandwidth) * 100;
  const [addGB, setAddGB] = useState<number>(0);

  const handleAddClick = () => {
    if (addGB > 0) {
      addGigabytes(addGB);
      setAddGB(0); // Reset input after adding
    }
  };

  return (
    <div className={styles.proxyHeaderContainer}>
      {/* Header */}
      <div className={styles.proxyHeaderTop}>
        <div>
          <h4>Generate Proxy</h4>
          <p className={styles.planId}>Plan ID: {planId}</p>
        </div>
        <div>
          <span className={styles.supportText}>Need Support?</span>
          <button className={styles.contactButton}>Contact Us</button>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cardsContainer}>
        {/* Current Plan Card */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <img
              src="https://lightningproxies.net/assets/images/icons/qube.svg"
              alt="Current Plan Icon"
              className={styles.icon}
            />
          </div>
          <p className={styles.cardTitle}>Current Plan</p>
          <h5>{currentPlan}</h5>
          <button className={styles.planSettingsButton}>Plan Settings</button>
        </div>

        {/* Plan Expiry Card */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <img
              src="https://lightningproxies.net/assets/images/icons/date-w.svg"
              alt="Plan Expiry Icon"
              className={styles.icon}
            />
          </div>
          <p className={styles.cardTitle}>Plan Expiry</p>
          <h5>{planExpiry}</h5>
        </div>

        {/* Total Bandwidth Card */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <img
              src="https://lightningproxies.net/assets/images/icons/quee.svg"
              alt="Total Bandwidth Icon"
              className={styles.icon}
            />
          </div>
          <p className={styles.cardTitle}>Total Bandwidth</p>
          <h5>{totalBandwidth.toFixed(2)} GB</h5>
          <div className={styles.progressCircleContainer}>
            <Circle
              percent={progress}
              strokeWidth={8}
              strokeColor="#007bff"
              trailColor="#e9ecef"
            />
            <div className={styles.progressText}>{`${progress.toFixed(0)}%`}</div>
          </div>
          <div className={styles.bandwidthDetails}>
            <div>
              <span className={styles.usedDot}></span> Used Bandwidth: {usedBandwidth.toFixed(2)} GB
            </div>
            <div>
              <span className={styles.remainingDot}></span> Remaining Bandwidth: {remainingBandwidth.toFixed(2)} GB
            </div>
          </div>
          <div className={styles.addBandwidth}>
            <input
              type="number"
              className={styles.bandwidthInput}
              placeholder="0"
              value={addGB}
              onChange={(e) => setAddGB(Number(e.target.value))}
            />
            <button className={styles.addButton} onClick={handleAddClick}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyHeader;
