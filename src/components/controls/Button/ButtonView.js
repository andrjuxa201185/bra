import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonStyles.scss';
import {Spinner} from '..';

const getClassName = style => {
  switch (style) {
    case 'primal':
      return styles.primal;
    case 'dark-blue':
      return styles.darkBlue;
    case 'orange':
      return styles.orange;
    case 'green':
      return styles.green;
    case 'red':
      return styles.red;
  }
};

const getSize = size => {
  switch (size) {
    case 'sm':
      return styles.sm;
    case 'md':
      return styles.md;
    case 'lg':
      return styles.lg;
  }
};

const Button = ({
                  title, onClick, style, loading, disabled, transparent, shadow, size,
                }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${getClassName(style)} ${getSize(size)}
      ${disabled ? styles.disabled: ''}
      ${transparent ? styles.transparent: ''}
      ${shadow ? styles.shadow: ''}`}
      disabled={disabled || loading}
    >
      {loading && size === 'lg' ?
        <div className={styles.spinner}>
          <Spinner />
        </div> :
        <span>{title}</span>
      }
    </button>

  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  transparent: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.string,
};

Button.defaultProps = {
  style: 'primal',
  disabled: false,
  loading: false,
  size: 'lg',
};

export default Button;
