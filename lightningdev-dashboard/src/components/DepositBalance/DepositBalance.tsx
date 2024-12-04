import React from "react";
import "./DepositBalance.css";

const DepositBalance: React.FC = () => {
  return (
    <div className="deposit-balance-container">
      <h4 className="section-title">Deposit Balance</h4>
      <p className="section-subtitle">Add balance to your account, using cryptocurrency</p>

      {/* Balance Input and Buttons */}
      <div className="balance-form">
        <input
          type="number"
          className="form-control balance-input"
          placeholder="$0.00"
        />
        <div className="button-group">
          <button className="btn btn-success">Add Balance using Cryptocurrency &gt;</button>
          <button className="btn btn-primary">Add Balance using Stripe &gt;</button>
        </div>
      </div>

      {/* Billing Information */}
      <div className="billing-info-alert alert alert-warning">
        Billing Information Required to continue order.{" "}
        <a href="/profile" className="alert-link">
          Go to profile page
        </a>
      </div>

      {/* Supported Cryptocurrencies */}
      <div className="crypto-support">
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
      <div className="footer-logos">
        <img src="/path-to-cryptomus-logo.png" alt="Cryptomus" />
        <img src="/path-to-stripe-logo.png" alt="Stripe" />
        <span className="extra-fee">+5%</span>
      </div>
    </div>
  );
};

export default DepositBalance;
