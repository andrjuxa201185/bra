import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InputStyles.scss';

const isPassword = type => type === 'password';
const isNumber = type => type === 'number';

const Input = props => {
  const {label, type, error, size } = props;
  let [newType, setNewType] = useState(type);

  const changeType = e => {
    e.preventDefault();
    setNewType(isPassword(newType) ? 'text': 'password');
  };

  return (
    <div className={styles.container}>
      <div className={styles.input__header}>
        <div className={`${styles.label} ${styles[size]}`}>
          {label}
        </div>
      </div>
      <div className={`${styles.input__container} ${styles[size]}`}>
        <input
          {...props}
          type={newType}
          style={isNumber(type) ? {padding: '0 15px'} : {}}
          className={`${styles.input} ${error ? styles.input_error: ''}`}
        />
        {isPassword(type) ?
          <span className={styles.input__show} onClick={changeType}>
            {isPassword(newType) ? 'show': 'hide'}
          </span>: null
        }
      </div>
      <div className={styles.error}>
        {error ? error : ''}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  size: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  size: 'lg',
};

export default Input;
