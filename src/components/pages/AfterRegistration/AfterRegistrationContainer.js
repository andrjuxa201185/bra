import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { AuthFormView, StepsIndicator } from "../../common";
import { Button } from "../../controls";
import { changePassword } from "../../../store/auth/authActions";
import { globals } from "../../../store/globals";
import {WORLD_VIEW} from '../../../navigation/routes';

const steps = ['Account', 'World view', 'Interests', 'Lifestyle'];

class AfterRegistrationContainer extends Component {

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  render() {
    return (
      <div className={'auth__background'}>
        <StepsIndicator activeStepIndex={0} steps={steps} />
        <AuthFormView title={'Create Your BRAINS Account'}>
          <p className='mb-4 text-center'>
            Creating your own personalized Brains portfolio is easy. The first step is to compete your World View, which can take as little as 1 minute or 20 minutes, depending upon which option you select on the next screen.
          </p>
          <p className='mb-4 text-center'>
            Once you complete your World View you are ready to invest, or you can continue with your Interests and Lifestyle assessments, which will give you more investment options.
          </p>
          <p className='mb-4 text-center'>
            Once you invest you can always come back another day to take the other assessments you opted out today, or make any changes.
          </p>
          <div className='row'>
            <div className='col-md-3'/>
            <div className='col-md-6'>
              <Button title='Next' onClick={this.navTo(WORLD_VIEW)}/>
            </div>
            <div className='col-md-3'/>
          </div>
        </AuthFormView>
      </div>
    );
  }
}

AfterRegistrationContainer.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePassword,
}, dispatch);

export default connect(null, mapDispatchToProps)(AfterRegistrationContainer);
