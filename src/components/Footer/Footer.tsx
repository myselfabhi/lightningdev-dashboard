import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.textCenter}>
        <p>© 2024 Lightning Proxies. All rights reserved.</p>
        {/* <div>
          <a href="#" className={styles.footerLinks}>
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="#" className={styles.footerLinks}>
            Privacy Policy
          </a>
        </div> */}
        {/* <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" aria-label="Twitter" className={styles.socialIcon}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className={styles.socialIcon}>
            <i className="fab fa-instagram"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
