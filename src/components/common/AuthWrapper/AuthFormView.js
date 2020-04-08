import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthFormStyles.scss';
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

const AuthFormView = ({
                        children,
                        title,
                        subTitle,
                        desc,
                        className = '',
                      }) => {
  return (
    <div className={`${styles.form__container} ${className}`}>
      <div className={styles.form__header}>
        <a href={DOMAIN_LANDING_URL} className={styles.form__logo}>
          <img src={require('../../../assets/images/logos/logo.png')} alt='logo.png'/>
        </a>
        {title && <div className={styles.form__title}>{title}</div>}
        {subTitle && <div className={styles.form__subTitle}>{subTitle}</div>}
        {desc ? <div className={styles.form__desc}>{desc}</div> : null}
      </div>
      <div className={styles.form__form} onSubmit={e => {
          e.preventDefault();
        }}>
        {children}
      </div>
    </div>
  );
};

AuthFormView.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.array,
};

export default AuthFormView;
