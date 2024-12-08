import React from 'react';
import styles from './DepositBalance.module.css';

const DepositBalance: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h4 className={styles.title}>Deposit Balance</h4>
          <p className={styles.subtitle}>
            Add balance to your account, using cryptocurrency
          </p>
        </div>
        <div>
        <span >Need Support?</span>
        <button className={`btn btn-primary ${styles.contactButton}`}>
          Contact Us
        </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.left}>
          {/* Top Card */}
          <div className={styles.topCard}>
            <p>Enter Topup Amount</p>
            <input type="text" className={styles.input} placeholder="$0.00" />
            <span className={styles.stripeVat}>Stripe VAT (0%)</span>
            <button className={`btn btn-success ${styles.addCryptoButton}`}>
              Add Balance using Cryptocurrency
            </button>
            <button className={`btn btn-primary ${styles.addStripeButton}`}>
              Add Balance using Stripe
            </button>
            <div className={styles.billingInfo}>
              Billing Information Required to continue order.{' '}
              <a href="/profile" className={styles.link}>
                Go to profile page
              </a>
            </div>
          </div>

          {/* Bottom Card */}
          <div className={styles.bottomCard}>
            <h6>Supported Cryptocurrencies</h6>
            <ul className={styles.cryptoList}>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/b.svg"
                  alt="BTC"
                />
                BTC = BTC Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/e.svg"
                  alt="ETH"
                />
                ETH = ERC20 Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/u.svg"
                  alt="USDC"
                />
                USDC = ERC20 Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/l.svg"
                  alt="LTC"
                />
                LTC = LTC Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/da.svg"
                  alt="DAI"
                />
                DAI = ERC20 Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/bc.svg"
                  alt="BCH"
                />
                BCH = Bitcoin Cash Network
              </li>
              <li>
                <img
                  src="https://lightningproxies.net/assets/images/icons/ut.svg"
                  alt="USDT"
                />
                USDT = ERC20 Network
              </li>
            </ul>
          </div>

          {/* Footer Logos */}
          <div className={styles.footerLogos}>
            <img
              src="/cryptomus.svg"
              alt="Cryptomus"
              className={styles.logo}
            />
            <img
              src="/stripe_logo.svg"
              alt="Stripe"
              className={styles.logo}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <img
            src="https://lightningproxies.net/assets/images/vector.svg"
            alt="Deposit Illustration"
            className={styles.illustration}
          />
          <div className={styles.benefits}>
            <h6 className={styles.benefitsTitle}>Benefits to adding Account Balance</h6>
            <p className={styles.benefitsDescription}>
              Adding balance via top-up has several advantages for regular
              users. Hassle of going through wallets and network confirmations
              is completely removed for future purchases.
            </p>
            <ul className={styles.benefitsList}>
              <li>Extended Usage</li>
              <li>Cost Savings</li>
              <li>Convenience</li>
              <li>Faster Transactions</li>
              <li>Budget Control</li>
              <li>Continuous Access</li>
              <li>Reduced Transaction Fees</li>
              <li>Time Savings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBalance;
