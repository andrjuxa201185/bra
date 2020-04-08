import React from 'react';
import PropTypes from 'prop-types';
import styles from './CirculsQuestionStyles.scss';
import { Tooltip } from "../../controls";

const CirculsQuestionView = ({options, onClick, questionId, secondary}) => {
  const handleSelect = answerId => e => {
    e.preventDefault();
    onClick({questionId, answerId});
  };

  const renderItem = item => {
    if (item.tooltip) {
      return (
        <Tooltip text={item.tooltip ? item.tooltip : null}>
          <a
            href='#'
            className={`${styles.item__round} ${item.checked ? styles.item__round_selected : ''}`}
            onClick={handleSelect(item.id)}
          />
          <div className={styles.item__text} data-tip data-for={item.name}>
            {item.checked ?
              <b>{item.name}</b> :
              item.name}
          </div>
        </Tooltip>
      );
    }
    return (
        <>
            <a
                href='#'
                className={`${styles.item__round} ${item.checked ? styles.item__round_selected : ''} ${secondary ? styles.item__round_sm : ''}`}
                onClick={!secondary ? handleSelect(item.id) : onClick(item.id)}
            />
            <div className={styles.item__text} data-tip data-for={item.name} onClick={!secondary ? handleSelect(item.id) : onClick(item.id)}>
                {item.checked ?
                    <b>{item.name}</b> :
                    item.name}
            </div>
        </>
    );
  };

  return (
    <div className={`${styles.container} ${secondary ? styles.container__sm : ''}`}>
      {options.map((item, index) => {
        return (
          <div key={index} className={styles.item} data-tip data-for={item.name}>
            {
              renderItem(item, index)
            }
          </div>
        );
      })}
    </div>
  );
};

CirculsQuestionView.propTypes = {
  options: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    tooltip: PropTypes.string,
  })).isRequired,
  questionId: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default CirculsQuestionView;
