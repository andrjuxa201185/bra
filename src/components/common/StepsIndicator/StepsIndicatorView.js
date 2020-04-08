import React from 'react';
import PropTypes from 'prop-types';
import styles from './StepsIndicatorStyles.scss';

const StepsIndicatorView = ({steps, activeStepIndex}) => {
  return (
    <div className={styles.steps}>
      {steps.map((item, index) => {
        return (
          <div className={`${styles.steps__item}`} key={index}>

            <div className={`${styles.steps__circle} ${index === activeStepIndex ? styles.steps__activeCircle: ''}`}>
              {index+1}
            </div>
            {typeof item === 'string' ?
              <div className={`${styles.steps__title} ${index === activeStepIndex ? styles.steps__activeTitle : ''}`}>{item}</div>:
              null
            }
          </div>
        );
      })}
    </div>
  );
};

StepsIndicatorView.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  activeStepIndex: PropTypes.number,
};

export default StepsIndicatorView;
