import React from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaServer,
  FaUser,
  FaShieldAlt,
  FaEnvelope,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import styles from "./CardsSection.module.css";

type CardsSectionProps = {
  addBalance: () => Promise<void>;
  renewPlan: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  balance: number;
  activePlans: number;
  dataLeft: number;
  totalDataPurchased: number;
  username: string;
  userId: string;
};

const CardsSection: React.FC<CardsSectionProps> = ({
  addBalance,
  renewPlan,
  balance,
  activePlans,
  dataLeft,
  totalDataPurchased,
  username,
  userId,
}) => {
  const dataPercentage = ((dataLeft / totalDataPurchased) * 100).toFixed(0);

  return (
    <div className={styles.cardsSection}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div>
          <h4 className={styles.welcomeTitle}>Welcome {username}</h4>
          <p className={styles.welcomeSubtitle}>
            Welcome back, were glad to have you.
          </p>
        </div>
        <button className={styles.readMoreBtn}>
          <img
            src="https://lightningproxies.net/assets/images/icons/pin.svg"
            alt="Pin Icon"
            className={styles.pinIcon}
          />
          <span>Residential State/City Targeting</span>
          <strong className={styles.readMoreLink}>Read More &gt;</strong>
        </button>
      </div>

      {/* Cards Section */}
      <div className={styles.cardsGrid}>
        {/* Active Balance */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <FaDollarSign className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>Active Balance</p>
          <h4 className={styles.cardValue}>${balance.toFixed(2)}</h4>
          <button className={styles.addBalanceBtn} onClick={addBalance}>
            Add Balance
          </button>
          <hr className={styles.cardDivider} />
          <p className={styles.cardFooter}>Total Balance Spent: $0.00</p>
        </div>

        {/* Active Plans */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <FaShoppingCart className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>Active Plans</p>
          <h4 className={styles.cardValue}>{activePlans}</h4>
          <button className={styles.purchasePlanBtn} onClick={renewPlan}>
            Purchase Plan
          </button>
          <hr className={styles.cardDivider} />
          <p className={styles.cardFooter}>Total Purchased Plans: {activePlans}</p>
        </div>

        {/* Data Left */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <FaServer className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>Data Left</p>
          <div className={styles.circularProgress}>
            <div className={styles.circularText}>{dataPercentage}%</div>
          </div>
          <h4 className={styles.cardValue}>{dataLeft.toFixed(2)} GB</h4>
          <hr className={styles.cardDivider} />
          <p className={styles.cardFooter}>
            Total Data Purchased: {totalDataPurchased.toFixed(2)} GB
          </p>
        </div>

        {/* User Profile */}
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <FaUser className={styles.icon} />
          </div>
          <p className={styles.cardTitle}>{username}</p>
          <p className={styles.cardFooter}>{userId}</p>
          <div className={styles.userActions}>
            <button className={styles.actionBtn} title="Shield">
              <FaShieldAlt />
            </button>
            <button className={styles.actionBtn} title="Email">
              <FaEnvelope />
            </button>
            <button className={styles.actionBtn} title="Info">
              <FaInfoCircle />
            </button>
            <button className={styles.actionBtnDanger} title="Delete">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
