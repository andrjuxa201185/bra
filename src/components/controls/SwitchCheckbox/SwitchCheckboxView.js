import React from 'react';
import PropTypes from 'prop-types';
import styles from './SwitchCheckboxStyles.scss';

const SwitchCheckbox = ({onChange, tooltip, checked}) => {
  return (
    <label className={`${styles.checkbox} ${tooltip && styles.tooltip}`}>
      <input
        type='checkbox'
        name={''}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.checkMark}>
      </div>
      {tooltip &&
      <span className={styles.tooltip__text}>
          {tooltip}
        </span>}
    </label>
  );
};

SwitchCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  checked: PropTypes.bool,
};

//SwitchCheckbox.defaultProps = {};

export default SwitchCheckbox;
