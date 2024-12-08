import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
import styles from './Checkout.module.css';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { name = '1 ISP Proxies', bandwidth = 'Unlimited', price = '4.00', duration = '1 Month', threads = 'Unlimited' } =
    router.query;

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [country, setCountry] = useState('');
  const [durationDays, setDurationDays] = useState(30);

  const handlePay = () => {
    console.log('Payment initiated for', name);
  };

  const validateForm = () => {
    setIsFormComplete(country !== '' && durationDays > 0);
  };

  return (
    <DashboardLayout>
      <div className={styles.checkoutPage}>
        <h3 className={styles.title}>Checkout</h3>
        <p className={styles.subtitle}>Proceed to pay for your selected plan</p>
        <div className={styles.checkoutContainer}>
          <div className={styles.planDetails}>
            <h4 className={styles.planTitle}>{name}</h4>
            <hr className={styles.blueHr} />
            <p className={styles.planDescription}>
              The most premium ISPs Available. Taken from Virgin Subnets only! Highest Quality Working on All Sites!
            </p>
            <hr className={styles.blueHr} />
            <table className={styles.detailsTable}>
              <tbody>
                <tr>
                  <td>Bandwidth</td>
                  <td>{bandwidth}</td>
                </tr>
                <tr>
                  <td>Proxy Type</td>
                  <td>ISP</td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td>{duration}</td>
                </tr>
                <tr>
                  <td>Threads</td>
                  <td>{threads}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <form className={styles.paymentForm} onChange={validateForm}>
            <div className={styles.couponSection}>
              <label>Coupon Code (Optional)</label>
              <div className={styles.couponInput}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button type="button" className={styles.applyButton}>
                  APPLY
                </button>
              </div>
            </div>

            <div className={styles.selectFields}>
              <div>
                <label>Select a Country</label>
                <select
                  className={styles.select}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select a Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div>
                <label>Duration (Days)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                />
              </div>
            </div>

            <div className={styles.paymentMethods}>
              <label>Payment Method:</label>
              <div className={styles.radioGroup}>
                <label>
                  <input type="radio" name="paymentMethod" value="crypto" defaultChecked /> Crypto
                </label>
                <label>
                  <input type="radio" name="paymentMethod" value="balance" /> Balance
                </label>
                <label>
                  <input type="radio" name="paymentMethod" value="stripe" /> Stripe{' '}
                  <span className={styles.stripeFee}>+3.5%</span>
                </label>
              </div>
            </div>

            <hr className={styles.blueHr} />

            <div className={styles.totalSection}>
              <p>
                Total: <span className={styles.totalPrice}>${price}</span>
              </p>
              <button
                type="button"
                className={`${styles.payButton} ${isFormComplete ? 'active' : ''}`}
                disabled={!isFormComplete}
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          </form>

          <div className={styles.warning}>
            <p>
              Billing Information Required to continue order. <a href="/profile">Go to profile page</a>
            </p>
          </div>
        </div>
        <div className={styles.cryptoSupport}>
          <h5>Supported Cryptocurrencies</h5>
          <div className={styles.cryptoList}>
            <ul>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/b.svg" alt="BTC" /> BTC = BTC Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/e.svg" alt="ETH" /> ETH = ERC20 Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/u.svg" alt="USDC" /> USDC = ERC20 Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/d.svg" alt="DOGE" /> Dogecoin = Dogecoin
                Network
              </li>
            </ul>
            <ul>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/l.svg" alt="LTC" /> LTC = LTC Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/da.svg" alt="DAI" /> DAI = ERC20 Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/bc.svg" alt="BCH" /> BCH = Bitcoin Cash
                Network
              </li>
              <li>
                <img src="https://lightningproxies.net/assets/images/icons/ut.svg" alt="USDT" /> USDT = ERC20 Network
              </li>
            </ul>
            
          </div>
          <div className={styles.footerLogos}>
          <img src="https://lightningproxies.net/assets/images/cryptoMus.svg" alt="Cryptomus" />
          <img src="https://lightningproxies.net/assets/images/stripe_logo.svg" alt="Stripe" />
        </div>

        </div>



      </div>
    </DashboardLayout>
  );
};

export default CheckoutPage;
