import React from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import hexRgb from 'hex-rgb';
import styles from './CircularCategoryStyles.scss';

const CircularCategoryView = ({title, icon, color, onClick, isActive, value, isUpdated}) => {
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (isUpdated === true) {
      setUpdate({update: true});
    }
  }, [isUpdated]);

  const customStyles = {
    backgroundColor: color,
  };
  const rgb = hexRgb(color);
  const bgUpdated = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.8)`;

  return (
    <a href='#'
       onClick={onClick}
       style={customStyles}
       className={`${styles.container} ${isActive ? styles.container_active : ''}`}>
      <div className={styles.content} style={customStyles}>
        <div className={styles.progress}>
          <CircularProgressbar
            className={styles.circularProgressbar}
            value={value}
            strokeWidth={6}
            background={update}
            styles={buildStyles({
              position: 'relative',
              textSize: '16px',
              // strokeLinecap: 'round',
              pathColor: `rgb(255, 255, 255)`,
              trailColor: `rgba(62, 152, 199, 0.3)`,
              backgroundColor: update ? bgUpdated : color,
            })}
          />

          <div className={styles.progress__updated}>
            {update ? 'updated' : null}
          </div>
          <div className={styles.progress__bg}>
            <img className={update ? styles.filter : ''} src={icon} alt='icon'/>
          </div>

        </div>
        <div className={styles.progress__title}>
          {title}
        </div>
      </div>
    </a>
  );
};

CircularCategoryView.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isUpdated: PropTypes.bool.isRequired,
};

export default CircularCategoryView;
