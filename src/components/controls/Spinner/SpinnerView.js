import React from 'react';
import PropTypes from 'prop-types';
import styles from './SpinnerStyles.scss';

const getSize = size => {
  switch (size) {
    case 'sm':
      return styles.spinner_sm;
    case 'md':
      return styles.spinner_md;
    case 'lg':
      return styles.spinner_lg;
  }
};

const SpinnerView = ({size}) => {
  const renderSpinner = () => (
    <div className={`${styles.spinner} ${getSize(size)}`}>
      <div/><div/><div/><div/><div/>
    </div>
  );
  if (size === 'lg') {
    return (
      <div className={styles.spinner__wrapper}>
        {renderSpinner()}
      </div>
    );
  }
  return renderSpinner();
};

SpinnerView.propTypes = {
  size: PropTypes.string,
};

SpinnerView.defaultProps = {
  size: 'sm',
};

export default SpinnerView;
