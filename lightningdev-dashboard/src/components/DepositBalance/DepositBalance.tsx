import React from "react";
import "./DepositBalance.css";

const DepositBalance: React.FC = () => {
  return (
    <div className="deposit-balance-container container">
      <div className="d-flex justify-content-between align-items-start">
        {/* Left Section */}
        <div className="balance-input-section">
          <h4 className="section-title">Deposit Balance</h4>
          <p className="section-subtitle">
            Add balance to your account, using cryptocurrency
          </p>

          {/* Balance Input and Buttons */}
          <div className="balance-form mb-4">
            <div className="mb-3">
              <input
                type="number"
                className="form-control balance-input"
                placeholder="$0.00"
              />
              <span className="stripe-vat">Stripe VAT (0%)</span>
            </div>
            <button className="btn btn-success w-100 mb-2">
              Add Balance using Cryptocurrency
            </button>
            <button className="btn btn-primary w-100">
              Add Balance using Stripe
            </button>
          </div>

          {/* Billing Information */}
          <div className="billing-info-alert alert alert-warning">
            Billing Information Required to continue order.{" "}
            <a href="/profile" className="alert-link">
              Go to profile page
            </a>
          </div>

          {/* Supported Cryptocurrencies */}
          <div className="crypto-support mt-4">
            <h6>Supported Cryptocurrencies</h6>
            <ul className="crypto-list">
              <li>BTC = BTC Network</li>
              <li>ETH = ERC20 Network</li>
              <li>USDC = ERC20 Network</li>
              <li>LTC = LTC Network</li>
              <li>DAI = ERC20 Network</li>
              <li>BCH = Bitcoin Cash Network</li>
              <li>USDT = ERC20 Network</li>
            </ul>
          </div>

          {/* Footer Logos */}
          <div className="footer-logos mt-4 d-flex align-items-center">
            <img
              src="/cryptomus.svg"
              alt="Cryptomus"
              className="footer-logo me-2"
            />
            <img src="/stripe_logo.svg" alt="Stripe" className="footer-logo" />
            <span className="extra-fee ms-2">+5%</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="balance-info-section text-center">
          <div className="support-header mb-3">
            Need Support?{" "}
            <a href="/support" className="btn btn-primary ms-2">
              Contact Us
            </a>
          </div>
          <img
            src="https://lightningproxies.net/assets/images/vector.svg"
            alt="Deposit Illustration"
            className="illustration-image"
          />
          <div className="benefits-section mt-4">
            <h6>Benefits to adding Account Balance</h6>
            <p>
              Adding balance via top-up has several advantages for regular
              users. Hassle of going through wallets and network confirmations
              is completely removed for future purchases.
            </p>
            <ul className="benefits-list">
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
