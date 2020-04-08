import React from 'react';
import PropTypes from 'prop-types';
import styles from './TooltipStyles.scss';

const TooltipView = ({children, text}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__box}>
        {text}
      </div>
      {children}
    </div>
  );
};

TooltipView.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default TooltipView;
