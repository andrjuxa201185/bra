



import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {forceLogin, logout} from '../../../store/auth/authActions';

class ForceLoginContainer extends Component {

  componentDidMount() {
    const hash = this.props.match.params.uuid_hash;
    this.props.force_login({uuid_hash: hash});
  }

  render() {
    return null;
  }
}

ForceLoginContainer.propTypes = {
  force_login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  force_login: forceLogin.request,
}, dispatch);

export default connect(null, mapDispatchToProps)(ForceLoginContainer);
