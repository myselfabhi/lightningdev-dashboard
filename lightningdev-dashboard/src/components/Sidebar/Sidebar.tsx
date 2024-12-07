import {
  Home,
  ShoppingCart,
  Wallet,
  FileText,
  Server,
  Users, Globe,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import "./sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside className="sidebar-wrapper">
      {/* Logo Section */}
      <div className="logo-box">
        <img
          src="https://lightningproxies.net/assets/images/logo.svg"
          alt="Lightning Proxies Logo"
          className="logo"
        />
        <button className="toggle-btn" onClick={toggleSidebar}>
<ChevronLeft
  size={18}
  className={`toggle-icon ${isSidebarOpen ? "" : "rotate"}`}
/>
</button>
      </div>

      {/* Main Menu */}
      <div className="menu-set">
        <h6 className="menu-heading">MAIN MENU</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/">
              <div className="menu-link">
                <Home size={18} className="menu-icon" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/purchase-plan">
              <div className="menu-link">
                <ShoppingCart size={18} className="menu-icon" />
                <span>Purchase Plan</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/deposit-balance">
              <div className="menu-link">
                <Wallet size={18} className="menu-icon" />
                <span>Deposit Balance</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/invoices">
              <div className="menu-link">
                <FileText size={18} className="menu-icon" />
                <span>Invoices</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/proxy-usage-log">
              <div className="menu-link">
                <Server size={18} className="menu-icon" />
                <span>Proxy Usage Log</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/sub-users-management">
              <div className="menu-link">
                <Users size={18} className="menu-icon" />
                <span>Sub-Users</span>
                {/* <span className="badge badge-new">New</span> */}
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Reseller */}
      <div className="menu-set">
        <h6 className="menu-heading">RESELLER</h6>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/reseller-dashboard">
              <div className="menu-link">
                <Globe size={18} className="menu-icon" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/api-docs">
              <div className="menu-link">
                <Globe size={18} className="menu-icon" />
                <span>API Docs</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Connect With Us */}
      <div className="menu-set">
        <h6 className="menu-heading">CONNECT WITH US</h6>
        <ul className="menu">
          <li className="menu-item">
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <img
                src="https://lightningproxies.net/assets/images/sidebar-icons/social-03.svg"
                alt="Discord"
                className="menu-icon"
              />
              <span>Join Discord Server</span>
            </a>
          </li>
          <li className="menu-item">
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-link"
            >
              <img
                src="https://lightningproxies.net/assets/images/sidebar-icons/social-01.svg"
                alt="Telegram"
                className="menu-icon"
              />
              <span>Join Telegram Channel</span>
            </a>
          </li>
        </ul>
      </div>

      {/* LightningProxies Extension */}
      <div className="extension-section">
  <span className="badge badge-new">NEW</span>
  <div className="extension-header">
    <img
      src="https://lightningproxies.net/assets/images/logo.svg"
      alt="LightningProxies Logo"
      className="extension-logo"
    />
    <span className="extension-title">LightningProxies Extension</span>
  </div>
  <p className="extension-description">
    A proxy extension enhances online privacy by routing traffic through an intermediary server.
  </p>
  <button className="extension-btn">
    <img
      src="https://lightningproxies.net/assets/images/chrome.svg"
      alt="Chrome Icon"
      className="chrome-icon"
    />
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
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://lightningproxies.net/assets/images/sidebar-icons/social-03.svg"
                alt="Discord"
                className="social-icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://lightningproxies.net/assets/images/sidebar-icons/social-01.svg"
                alt="Telegram"
                className="social-icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
