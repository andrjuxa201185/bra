import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import {editUserProfile, uploadAvatar} from '../../../../store/userProfile/userProfileActions';
import Field from '../parts/field';
import PhotoField from '../parts/photoField';
import PasswordField from '../parts/passwordField';
import {Spinner} from '../../../controls';
import * as validator from "../../../../helpers/validator";

class SettingsPersonalInfo extends Component{

  handleSave = field => {
    const {editUserProfile} = this.props;
    editUserProfile(field);
  };

  handleUploadAvatar = blob => {
    const {uploadAvatar} = this.props;
    uploadAvatar(blob);
  };

  render () {
    const {styles, data, dataStatus} = this.props;

    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (data) {
      return (
        <div className='panel'>
          <div className={styles.personalInfo}>
            <PhotoField
              onSave={this.handleUploadAvatar}
              name='Profile Photo'
              styles={styles}
              value={data.image || require('../../../../assets/images/icons/user.png')}
            />
            {/*{data.utype !== 0 ?*/}
              {/*<Field*/}
                {/*styles={styles}*/}
                {/*onSave={this.handleSave}*/}
                {/*value={data.username}*/}
                {/*name='username'*/}
                {/*title='Member ID'*/}
                {/*validate={{*/}
                  {/*required: ['username'],*/}
                {/*}}*/}
              {/*/>: null*/}
            {/*}*/}
            <Field
              styles={styles}
              onSave={this.handleSave}
              value={data.email}
              title='Email'
              name='email'
              validate={{
                required: ['email'],
                custom: [validator.email(['email'])],
              }}
            />
            <Field
              styles={styles}
              onSave={this.handleSave}
              value={data.first_name}
              title='First Name'
              name='firstName'
              validate={{
                required: ['firstName'],
              }}
            />
            <Field
              styles={styles}
              onSave={this.handleSave}
              value={data.last_name}
              title='Last Name'
              name='lastName'
              validate={{
                required: ['lastName'],
              }}
            />
            {data.utype !== 0 ?
              <PasswordField
              styles={styles}
              onSave={this.handleSave}
            />: null }
          </div>
        </div>
      );
    }
    return null;
  }
}

SettingsPersonalInfo.propTypes = {
  //actions
  editUserProfile: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  //data
  styles: PropTypes.object.isRequired,
  data: PropTypes.object,
  dataStatus: PropTypes.object,
};

const mapStateToProps = ({userProfile: {data, dataStatus}}) => ({
  data,
  dataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editUserProfile: editUserProfile.request,
  uploadAvatar: uploadAvatar.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPersonalInfo);
