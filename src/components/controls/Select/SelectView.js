import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectStyles.scss';

const Select = props => {
  const {label, options, onSelect, categoryId} = props;
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.select__container}>
        <select
          className={styles.select}
          value={categoryId}
          onChange={onSelect}
        >
          {options && options.map(item => <option key={item.id} value={item.id} selected={item.checked}>{item.name}</option>)}
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  categoryId: PropTypes.number,
};

export default Select;
