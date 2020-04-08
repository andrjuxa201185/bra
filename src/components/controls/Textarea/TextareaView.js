import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextareaStyles.scss';

const Textarea = props => {
  const {label, error} = props;

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.textarea__container}>
        <textarea
          {...props}
          className={`${styles.textarea} ${error ? styles.textarea_error: ''}`}
        >
        </textarea>
      </div>
      <div className={styles.error}>
        {error ? error : ''}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
};

export default Textarea;
