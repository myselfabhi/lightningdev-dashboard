import React, { useState, useEffect } from 'react';
import styles from './PlanSection.module.css';
import { FaFilter } from 'react-icons/fa';

type Plan = {
  id: string;
  name: string;
  dataLeft: number; // in GB
  totalData: number; // in GB
  expires: string; // Expiry date as a string
};

const PlanSection: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data fetching
    setTimeout(() => {
      setPlans([
        {
          id: '674cb0b5f674e52455084591',
          name: 'Trial-Residential-Plan 0.15 GB',
          dataLeft: 0.15,
          totalData: 0.15,
          expires: 'Jan 1, 2025',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.planSection}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h5 className={styles.title}>Your Active Plans</h5>
          <p className={styles.subtitle}>Generate proxies with just a click of a button</p>
        </div>
        <div className={styles.filter}>
          <FaFilter />
        </div>
      </div>

      {/* Gift Section */}
      <div className={styles.giftSection}>
        <input
          type="text"
          className={styles.giftInput}
          placeholder="Enter gift code"
        />
        <button className={styles.giftButton}>
 
          Get your gift
          <img
            src="https://lightningproxies.net/assets/images/gift-1gb.svg"
            alt="Gift"
            className={styles.giftIcon}
          />
        </button>
        <div className={styles.helpText}>
          How can I get a gift?{' '}
          <img
            src="https://lightningproxies.net/assets/images/book.svg"
            alt="Book"
            className={styles.bookIcon}
          />
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading plans...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Plan Cards */}
      {!loading &&
        plans.map((plan) => (
          <div key={plan.id} className={styles.planCard}>
            <div className={styles.progressContainer}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className={styles.circularProgress}
              >
                <circle
                  fill="none"
                  stroke="rgba(22, 117, 255, 0.5)"
                  cx="40"
                  cy="40"
                  r="34"
                  strokeWidth="12"
                />
                <circle
                  fill="none"
                  stroke="rgba(22, 117, 255, 1)"
                  cx="40"
                  cy="40"
                  r="34"
                  strokeWidth="12"
                  transform="rotate(-90 40 40)"
                  strokeDasharray="213.6, 0"
                  style={{ transition: '0.5s' }}
                />
                <text
                  fill="#181818"
                  fontFamily="Figtree"
                  fontSize="1.11125rem"
                  fontWeight="600"
                  x="50%"
                  y="50%"
                  dy="0.4rem"
                  textAnchor="middle"
                >
                  {((plan.dataLeft / plan.totalData) * 100).toFixed(0)}%
                </text>
              </svg>
            </div>
            <div className={styles.planDetails}>
              <h6 className={styles.planTitle}>{plan.name}</h6>
              <p className={styles.planDescription}>
                Ideal proxies for any use case & purpose. By accessing our 10M+
                IP pool non-subnet linked, bans and blocks are non-existent.
              </p>
              <hr className={styles.separator} />
              <div className={styles.planMeta}>
                <div className={styles.metaGroup}>
                  <p className={styles.metaLabel}>Plan ID</p>
                  <h6>{plan.id}</h6>
                </div>
                <div className={styles.metaGroup}>
                  <p className={styles.metaLabel}>Data Left</p>
                  <h6>
                    {plan.dataLeft.toFixed(2)} GB / {plan.totalData.toFixed(2)}{' '}
                    GB
                  </h6>
                </div>
                <div className={styles.metaGroup}>
                  <p className={styles.metaLabel}>Expires</p>
                  <h6>{plan.expires}</h6>
                </div>
                              <button className={styles.generateButton}>
                Generate Proxy →
              </button>
              </div>

            </div>
          </div>
        ))}
    </div>
  );
};

export default PlanSection;
