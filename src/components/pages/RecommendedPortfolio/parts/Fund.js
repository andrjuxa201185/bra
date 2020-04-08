import React, { useState } from 'react';
import PropTypes from "prop-types";
import { SwitchCheckbox, SimpleProgress } from '../../../controls';
import styles from "./FundStyles.scss";
import { lockDecrButton, lockIncrButton } from '../../../../helpers/fundValueCalculator';
import FundsIcon1 from '../../../../assets/images/icons/funds-icon-1.svg';
import FundsIcon2 from '../../../../assets/images/icons/Brain_icon.svg';
import FundsIcon3 from '../../../../assets/images/icons/Tailor_icon.svg';
import Arrow from '../../../../assets/images/icons/arrow-down.svg';

const Fund = ({
                name,
                isLocked,
                color,
                recommended,
                expert,
                tailored,
                id,
                onSwitch,
                onButtonClick,
                data,
                isOpened,
                text,
              }) => {
  let [isOpen, setIsOpen] = useState(isOpened);
  let [locked, setLocked] = useState(isLocked);

  const handleSwitch = () => {
    setLocked(!locked);
    onSwitch(!locked, id);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.arrow} ${isOpen ? styles.arrow_opened : ''}`}
           onClick={() => setIsOpen(!isOpen)}>
        <Arrow/>
      </div>

      <div className={styles.controls}>
        <div className='d-flex align-items-center'>
          <div className={`${styles.title} ${locked ? styles.disabled : ''}`}>{name}</div>
          <div className={`${styles.switcher} ${!isOpen ? styles.hidden : ''}`}>
            <SwitchCheckbox
              checked={locked}
              tooltip='When clicked holds that percentage value constant while the portfolio is being rebalanced'
              onChange={handleSwitch}
            />
          </div>
        </div>

        <div className={`${styles.progresses} ${locked ? styles.disabled : ''}`}>
          <div className={`${ !(recommended === tailored) && !isOpen ? styles.hidden : ''}`}>
            <SimpleProgress
              value={recommended}
              color={color}
              icon={FundsIcon1}/>
          </div>

          <div className={`${!isOpen ? styles.hidden : ''}`}>
            <SimpleProgress
              value={expert}
              color={color}
              icon={FundsIcon2}/>
          </div>

          <div className={`${(recommended === tailored) && !isOpen ? styles.hidden : ''}`}>
            <SimpleProgress
              value={tailored}
              color={color}
              icon={FundsIcon3}/>
          </div>

          <div className={`${!isOpen ? styles.hidden : ''}`}>
            <div className={styles.controlButtons}>
              <div
                className={`
                ${styles.controlButton}
                ${styles.controlButtonDecr}
                ${lockDecrButton(tailored, data, id) ? styles.controlButtonDisable : ''}
                `}
                onClick={onButtonClick(false, id)}>
              </div>
              <div
                className={`
                ${styles.controlButton}
                ${styles.controlButtonIncr}
                ${lockIncrButton(tailored, data) ? styles.controlButtonDisable : ''}
                `}
                onClick={onButtonClick(true, id)}>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={`${!isOpen ? styles.hidden : ''} ${styles.text}`}>
        {text}
      </div>
    </div>
  );
};

Fund.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  isOpened: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  expert: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  recommended: PropTypes.number.isRequired,
  tailored: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  //actions
  onSwitch: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,

};

export default Fund;
