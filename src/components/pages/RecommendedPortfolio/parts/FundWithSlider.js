import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import styles from "./FundStyles.scss";
import {getSliderHandleWidth} from '../../../../utils';
import { Tooltip } from '../../../controls';

const FundWithSlider = ({
                          tailored,
                          color,
                          text,
                          title,
                          onChange,
                          max,
                          id,
                          onAfterChange,
                        }) => {
  let [val, setVal] = useState(tailored);
  const handleChange = newVal => {
    setVal(newVal);
    onChange(newVal, id);
  };

  const handleAfterChange = () => {
    onAfterChange();
    // onChange(newVal, id);
  };

  const renderHandle = () => {
    return (
      <div
        className={styles.slider__handler}
        style={{left: getSliderHandleWidth(val)}}
      >
        <span className={styles.slider__textVal}>{val}%</span>
      </div>
    );
  };

  return (
    <div className={styles.fundSlider__container}>
        <div className={styles.fundSlider__title}>
          <div className={styles.fundSlider__color} style={{backgroundColor: color}}/>
          <Tooltip text={text}>
            <span className={styles.fundSlider__titleText}>
              {title}
            </span>
          </Tooltip>
        </div>
      <div className={styles.slider__container}>
        <Slider
          onChange={handleChange}
          onAfterChange={handleAfterChange}
          value={val}
          trackStyle={{backgroundColor: '#55349d'}}
          railStyle={{backgroundColor: '#d9efff', height: '5px', borderRadius: '3px'}}
          handle={renderHandle}
          min={0}
          max={max}
        />
      </div>
    </div>

  );
};

FundWithSlider.propTypes = {
  tailored: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
};

export default FundWithSlider;
