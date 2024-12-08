import React from 'react';
import { Circle } from 'rc-progress';
import { Home, Calendar, Database } from 'lucide-react';
import styles from './ProxyHeader.module.css';

type ProxyHeaderProps = {
  planId: string;
  currentPlan: string;
  planExpiry: string;
  totalBandwidth: number; // in GB
  usedBandwidth: number; // in GB
  remainingBandwidth: number; // in GB
};

const ProxyHeader: React.FC<ProxyHeaderProps> = ({ planId, currentPlan, planExpiry, totalBandwidth, usedBandwidth, remainingBandwidth }) => {
  const progress = (usedBandwidth / totalBandwidth) * 100;

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
            <Home size={20} className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>Current Plan</p>
          <h5>{currentPlan}</h5>
          <button className={styles.planSettingsButton}>Plan Settings</button>
        </div>

        {/* Plan Expiry Card */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <Calendar size={20} className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>Plan Expiry</p>
          <h5>{planExpiry}</h5>
        </div>

        {/* Total Bandwidth Card */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <Database size={20} className={styles.icon} />
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
            />
            <button className={styles.addButton}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyHeader;
