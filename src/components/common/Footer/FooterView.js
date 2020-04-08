import React from 'react';
import styles from "./FooterStyles.scss";
import FacebookIcon from '../../../assets/images/icons/facebook-icon.svg';
import TwitterIcon from '../../../assets/images/icons/twitter-icon.svg';
import LinkedinIcon from '../../../assets/images/icons/linkedin-icon.svg';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

const FooterView = () => (
  <div className={styles.footer}>

    <span className={styles.copyright}>© 2020 Brains. All rights reserved. </span>

    <div className={styles.social}>
      <a href='#' className={styles.socialItem}>
        <FacebookIcon/>
      </a>
      <a href='#' className={styles.socialItem}>
        <TwitterIcon/>
      </a>
      <a href='#' className={styles.socialItem}>
        <LinkedinIcon/>
      </a>
    </div>

    <div className={styles.footerLinks}>
      <a href={`${DOMAIN_LANDING_URL}/privacy-policy.php`} className={styles.footerLink}>Privacy Policy</a>
      <a href={`${DOMAIN_LANDING_URL}/terms-of-use.php`} target='_blank' className={styles.footerLink} rel='noopener noreferrer'>
        Terms of Use
      </a>
      <a href={`${DOMAIN_LANDING_URL}/disclosures.php`} target='_blank' className={styles.footerLink} rel='noopener noreferrer'>
        Disclosures
      </a>
    </div>

  </div>
);

export default FooterView;
