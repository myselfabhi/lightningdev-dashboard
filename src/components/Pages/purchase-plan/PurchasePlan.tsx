import React, { useState } from 'react';
import PlanCard from '../../PlanCard';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
import styles from './PurchasePlan.module.css';

const residentialPlansBandwidth = [
  { title: 'Residential 1GB', price: '$4.50', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 5GB', price: '$20.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 10GB', price: '$35.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 25GB', price: '$87.50', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 50GB', price: '$162.50', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 100GB', price: '$300.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 300GB', price: '$720.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 500GB', price: '$1000.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 1000GB', price: '$1500.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 2000GB', price: '$2750.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 3000GB', price: '$3750.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 5000GB', price: '$5500.00', details: ['10M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Country, State, City & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
];

const residentialPlansUnlimited = [
  { title: 'Residential Day', price: '$300.00', details: ['2M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Continent Targeting', 'Rotating & Sticky Sessions', 'Unlimited Bandwidth', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential Week', price: '$1100.00', details: ['2M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Continent Targeting', 'Rotating & Sticky Sessions', 'Unlimited Bandwidth', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential Month', price: '$2800.00', details: ['2M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Continent Targeting', 'Rotating & Sticky Sessions', 'Unlimited Bandwidth', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  { title: 'Residential 2 Month', price: '$4600.00', details: ['2M+ Real Residential Peers', 'IP & User:Pass Authentication', 'Continent Targeting', 'Rotating & Sticky Sessions', 'Unlimited Bandwidth', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
];

const mobilePlans = [
  { title: 'Mobile 1GB', price: '$5.00', details: ['500K+ Real Mobile Peers', 'IP & User:Pass Authentication', 'Country & ISP Targeting', 'Rotating & Sticky Sessions', 'Unlimited Concurrent Connections', 'HTTP/SOCKS5 Protocol Supported'] },
  // Include all mobile plans similarly...
];

const datacenterPlans = [
  { title: 'Datacenter Day', price: '$10.00', details: ['20,000 IP Pool', 'IP Authentication', 'Country Targeting', 'Backconnect Ports', 'Unlimited Bandwidth', 'HTTP Protocol Supported'] },
  { title: 'Datacenter Week', price: '$50.00', details: ['20,000 IP Pool', 'IP Authentication', 'Country Targeting', 'Backconnect Ports', 'Unlimited Bandwidth', 'HTTP Protocol Supported'] },
  { title: 'Datacenter Month', price: '$135.00', details: ['20,000 IP Pool', 'IP Authentication', 'Country Targeting', 'Backconnect Ports', 'Unlimited Bandwidth', 'HTTP Protocol Supported'] },
];

const ipv6PlansBandwidth = [
  { title: 'IPv6 100GB', price: '$20.00', details: ['/29 Network IP Pool Size', 'IP & User:Pass Authentication', 'Country Targeting', 'Rotating & Sticky Sessions', 'HTTP Protocol Supported'] },
  // Add other IPv6 Bandwidth plans...
];

const ipv6PlansUnlimited = [
  { title: 'Unlimited IPv6', price: '$10.00', details: ['/29 Network IP Pool Size', 'IP & User:Pass Authentication', 'Country Targeting', 'Rotating & Sticky Sessions', 'HTTP Protocol Supported'] },
];

const ispPlans = [
  { title: 'ISP Proxies', price: '$4.00', details: ['Worldwide ISP Locations', 'Tier 1 & 2 ISPs', 'Country Targeting', 'Static ISP Proxies', 'Unlimited Bandwidth', 'HTTP/SOCKS5 Protocols'] },
];

const PurchasePlanPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'Residential' | 'Mobile' | 'Datacenter' | 'IPv6' | 'ISP'>('Residential');
  const [activeSubTab, setActiveSubTab] = useState<'Bandwidth' | 'Unlimited'>('Bandwidth');

  const renderCards = (plans: { title: string; price: string; details: string[] }[]) => {
    return plans.map((plan, index) => (
      <div key={index} className={`col-12 col-md-6 col-lg-4 ${styles.cardContainer}`}>
        <PlanCard title={plan.title} price={plan.price} details={plan.details} onPurchase={() => alert(`Purchased: ${plan.title}`)} />
      </div>
    ));
  };

  return (
    <DashboardLayout>
      <div className={styles.purchasePlanPage}>
        {/* Main Tabs */}
        <div className={styles.mainTabs}>
  {['Residential', 'Mobile', 'Datacenter', 'IPv6', 'ISP'].map((tab) => (
    <button
      key={tab}
      className={`${styles.tabButton} ${activeMainTab === tab ? styles.activeTab : ''}`}
      onClick={() => setActiveMainTab(tab as 'Residential' | 'Mobile' | 'Datacenter' | 'IPv6' | 'ISP')}
    >
      {tab} {tab === 'Mobile' && <span className={styles.newBadge}>NEW</span>}
    </button>
  ))}
</div>

{(activeMainTab === 'Residential' || activeMainTab === 'IPv6') && (
  <div className={styles.subTabs}>
    {['Bandwidth', 'Unlimited'].map((subTab) => (
      <button
        key={subTab}
        className={`${styles.tabButton} ${activeSubTab === subTab ? styles.activeTab : ''}`}
        onClick={() => setActiveSubTab(subTab as 'Bandwidth' | 'Unlimited')}
      >
        {subTab}
      </button>
    ))}
  </div>
)}


        {/* Plan Cards */}
        <div className={`row ${styles.cardsRow}`}>
          {activeMainTab === 'Residential' && activeSubTab === 'Bandwidth' && renderCards(residentialPlansBandwidth)}
          {activeMainTab === 'Residential' && activeSubTab === 'Unlimited' && renderCards(residentialPlansUnlimited)}
          {activeMainTab === 'Mobile' && renderCards(mobilePlans)}
          {activeMainTab === 'Datacenter' && renderCards(datacenterPlans)}
          {activeMainTab === 'IPv6' && activeSubTab === 'Bandwidth' && renderCards(ipv6PlansBandwidth)}
          {activeMainTab === 'IPv6' && activeSubTab === 'Unlimited' && renderCards(ipv6PlansUnlimited)}
          {activeMainTab === 'ISP' && renderCards(ispPlans)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PurchasePlanPage;
