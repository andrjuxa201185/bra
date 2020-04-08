import React from 'react';
import {Prompt} from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../../store/alert/alertActions';
import connect from 'react-redux/es/connect/connect';

export class RouteLeavingGuard extends React.Component {
  state = {
    modalVisible: true,
    lastLocation: null,
    // confirmedNavigation: false,
  };
  showModal = location => {
    this.props.showAlert({title: this.props.title, msg: this.props.msg});
    this.setState({
      lastLocation: location,
    });
  };

  handleBlockedNavigation = nextLocation => {
    const {shouldBlockNavigation} = this.props;
    if (shouldBlockNavigation(nextLocation)){
      this.showModal(nextLocation);
      // return false;
    }
    return true;
  };

  render() {
    const {when} = this.props;
    return (
      <>
        <Prompt
          when={when}
          message={this.handleBlockedNavigation}/>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showAlert,
}, dispatch);

export default connect(null, mapDispatchToProps)(RouteLeavingGuard);
