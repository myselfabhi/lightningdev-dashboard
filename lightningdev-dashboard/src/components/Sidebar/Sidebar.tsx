import React from "react";
import {
    FaHome,
    FaCartPlus,
    FaWallet,
    FaFileInvoice,
    FaServer,
    FaUsers,
    FaQuestionCircle,
    FaBook,
    FaTelegramPlane,
    FaDiscord,
    FaRegNewspaper,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-wrapper">
      {/* Logo Section */}
      <div className="logo-box">
        <img src="/logo.svg" alt="Lightning Proxies Logo" className="logo" />
      </div>

      {/* Main Menu */}
      <div className="menu-set">
        <h6 className="menu-heading">MAIN MENU</h6>
        <ul className="menu">
          <li className="menu-item active">
            <FaHome size={18} className="menu-icon" />
            <span>Dashboard</span>
          </li>
          <li className="menu-item">
            <FaCartPlus size={18} className="menu-icon" />
            <span>Purchase Plan</span>
          </li>
          <li className="menu-item">
            <FaWallet size={18} className="menu-icon" />
            <span>Deposit Balance</span>
          </li>
          <li className="menu-item">
            <FaFileInvoice size={18} className="menu-icon" />
            <span>Invoices</span>
          </li>
          <li className="menu-item">
            <FaServer size={18} className="menu-icon" />
            <span>Proxy Usage Log</span>
          </li>
          <li className="menu-item">
            <FaUsers size={18} className="menu-icon" />
            <span>Sub-Users</span>
            <span className="badge badge-new">New</span>
          </li>
        </ul>
      </div>

      {/* Referrals */}
      <div className="menu-set">
        <h6 className="menu-heading">REFERRALS</h6>
        <ul className="menu">
          <li className="menu-item">
            <FaUsers size={18} className="menu-icon" />
            <span>Referral</span>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div className="menu-set">
        <h6 className="menu-heading">SUPPORT</h6>
        <ul className="menu">
          <li className="menu-item">
            <FaQuestionCircle size={18} className="menu-icon" />
            <span>FAQs</span>
          </li>
          <li className="menu-item">
            <FaBook size={18} className="menu-icon" />
            <span>Proxy Guide</span>
            <span className="badge badge-updated">Updated</span>
          </li>
        </ul>
      </div>

      {/* Reseller */}
      <div className="menu-set">
        <h6 className="menu-heading">RESELLER</h6>
        <ul className="menu">
          <li className="menu-item">
            <FaRegNewspaper size={18} className="menu-icon" />
            <span>Dashboard</span>
          </li>
          <li className="menu-item">
            <FaRegNewspaper size={18} className="menu-icon" />
            <span>API Docs</span>
          </li>
        </ul>
      </div>

      {/* Connect With Us */}
      <div className="menu-set">
        <h6 className="menu-heading">CONNECT WITH US</h6>
        <ul className="menu">
          <li className="menu-item">
            <FaDiscord size={18} className="menu-icon" />
            <span>Join Discord Server</span>
          </li>
          <li className="menu-item">
            <FaTelegramPlane size={18} className="menu-icon" />
            <span>Join Telegram Channel</span>
          </li>
        </ul>
      </div>

      {/* Extension Section */}
      <div className="extension-section">
        <div className="extension-header">
          <img src="/logo-extension.svg" alt="Extension Logo" />
          <span>LightningProxies Extension</span>
          <span className="badge badge-new">NEW</span>
        </div>
        <p className="extension-description">
          A proxy extension enhances online privacy by routing traffic through an intermediary server.
        </p>
        <button className="btn btn-primary extension-btn">
          Add to Chrome
        </button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <ul className="footer-links">
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
        <ul className="social-icons">
          <li>
            <FaDiscord size={20} />
          </li>
          <li>
            <FaTelegramPlane size={20} />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
