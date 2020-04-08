import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Donut from "britecharts-react/lib/cjs/Donut";

export default class DonutView extends Component {

  static propTypes = {
    chartData: PropTypes.object.isRequired,
    highlightSliceById: PropTypes.number,
  };

  render () {
    const {chartData, highlightSliceById} = this.props;
    return (
      <Donut
        highlightSliceById={highlightSliceById}
        data={chartData.dataSet}
        isAnimated={true}
        centeredTextFunction={({name, percentage}) => {
          return `${percentage}% ${name} `;
        }}
        orderingFunction={(a, b) => b.order - a.order}
        internalRadius={80}
        width={216}
        externalRadius={108}
        radiusHoverOffset={8}
        colorSchema={chartData.colorSchema}
      />
    );
  }
}
