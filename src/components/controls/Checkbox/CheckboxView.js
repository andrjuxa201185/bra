import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxStyles.scss';

const Checkbox = ({text, onChange, error}) => {
  return (
    <div className={styles.container}>
      <label>
        <input type='checkbox' onChange={onChange}/>
        <div className={`${styles.text} ${error ? styles.error : ''}`}>
          {text ? text : null}
        </div>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,

};

Checkbox.defaultProps = {

};

export default Checkbox;
