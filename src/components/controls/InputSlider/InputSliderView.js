import React from "react";
import PropTypes from 'prop-types';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const InputSliderView = props => {

  if (props.tipProps) {
    return (
      <SliderWithTooltip
        {...props}
        trackStyle={{backgroundColor: '#7748dd', height: 3}}
        handleStyle={{
          border: 'none',
          height: 30,
          width: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: -15,
          marginTop: 0,
          backgroundColor: '#008cff',
        }}
        railStyle={{backgroundColor: '#d0e4f2', height: 3}}
      />
    );
  }
  return (
    <Slider
      {...props}
      trackStyle={{backgroundColor: '#7748dd', height: 3}}
      handleStyle={{
        border: 'none',
        height: 30,
        width: 30,
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: -15,
        marginTop: 0,
        backgroundColor: '#008cff',
      }}
      railStyle={{backgroundColor: '#d0e4f2', height: 3}}
    />
  );
};

InputSliderView.propTypes = {
  tipProps: PropTypes.object,
};

export default InputSliderView;
