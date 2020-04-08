import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { AuthFormView } from "../../common";
import { Button } from "../../controls";
import { reSendConfirmationEmail } from '../../../store/auth/authActions';

class InviteCheckMailContainer extends Component {

  // navToMail = () => {
  //   window.location.href = 'https://mail.google.com';
  // };

  static propTypes = {
    reSendConfirmationEmail: PropTypes.func.isRequired,
  }

  reSendEmail = () => {
    this.props.reSendConfirmationEmail();
  };

  render() {
    return (
      <div className={'auth__background justify-content-center'}>
        <AuthFormView subTitle={'We have sent you a verification email. Please check your inbox (or spam) to complete your Brains registration.'}>
          <div className='row'>
            <div className='col-md-2'/>
            <div className='col-md-8 mx-auto' >
              {/*<Button title='Check mail' onClick={this.navToMail}/>*/}
              <Button title='Resend verification email' onClick={this.reSendEmail}/>
            </div>
            <div className='col-md-2'/>
          </div>
        </AuthFormView>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  reSendConfirmationEmail: reSendConfirmationEmail.request,
}, dispatch);

export default connect(null, mapDispatchToProps)(InviteCheckMailContainer);
