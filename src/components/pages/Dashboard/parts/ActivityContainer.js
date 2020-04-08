import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ActivityView from './ActivityView';
import {
  getActivities,
  resetActivities,
} from '../../../../store/dashboard/dashboardActions';
import moment from 'moment';

class ActivityContainer extends Component {
  state = {
    startDate: '',
    endDate: '',
  };

  getFormattedDate = date => {
    if (!date) {
      return;
    }
    return date && `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  };

  handleChangeDate = isStart => date => {
    if (isStart) {
      this.setState({startDate: date});
    } else {
      this.setState({endDate: date});
    }
  };

  handleDate = date => {
    return moment(date).format('MM-DD-YYYY HH:mm a');
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate || this.state.endDate !== prevState.endDate) {
      if (this.state.startDate && this.state.endDate) {
        // if (this.state.startDate.getTime() <= this.state.endDate.getTime()) {
          const requestStartDate = this.getFormattedDate(this.state.startDate);
          const requestEndDate = this.getFormattedDate(this.state.endDate);
          this.props.getActivities({ daterange: [requestStartDate, requestEndDate]});
        // }
      } else {
        if (this.props.activitiesData) {
          this.props.resetActivities();
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.resetActivities();
  }

  render() {
    return (
      <ActivityView
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        getFormattedDate={this.getFormattedDate}
        onChangeDate={this.handleChangeDate}
        activitiesData={this.props.activitiesData}
        dataStatus={this.props.activitiesDataStatus}
        handleDate={this.handleDate}
      />
    );
  }
}

ActivityContainer.propTypes = {

};

const mapStateToProps = ({dashboard: { activitiesData, activitiesDataStatus }}) => ({
  activitiesData,
  activitiesDataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getActivities: getActivities.request,
  resetActivities,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
