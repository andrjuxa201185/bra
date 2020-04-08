import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';
import ReferFriendView from "./ReferFriendView";
import * as validator from "../../../helpers/validator";
import {setReferFriendInfo} from "../../../store/referFriend/referFriendActions";
import {showAlert} from "../../../store/alert/alertActions";

class ReferFriendContainer extends Component {
  state = {
    emails: [
      {
        index: 0,
        email: '',
      },
    ],
    maxItems: false,
    errors: [],
  };

  componentDidUpdate = prevProps => {
    if (prevProps.referFriendStatus.loaded !== this.props.referFriendStatus.loaded && this.props.referFriendStatus.loaded) {
      this.clearForm();
      if (this.props.referFriendMsg) {
        this.setState({
          msg: this.props.referFriendMsg,
        });
      }
    }

    if (prevProps.errors !== this.props.errors && this.props.errors) {
      const newErrors = this.props.errors.map(item => ({index: Object.keys(item)[0], value: item[Object.keys(item)[0]][0]}));
      this.setState({
        errors: newErrors,
      });
    }
  };


  validator = () => {
    const requiredFields = [];
    const custom = [];

    if (this.state.emails.every(item => !item.email)) {
      requiredFields.push(0);
    } else {
      const filledEmails = this.state.emails.filter(item => item.email);
      filledEmails.forEach(item => {
        custom.push(validator.email([item.index]));
      });
      const duplicatesCounter = {};
      filledEmails.forEach(item => {
        if (duplicatesCounter[item.email]) {
          duplicatesCounter[item.email].push(item.index);
        } else {
          duplicatesCounter[item.email] = [item.index];
        }
      });

      Object.values(duplicatesCounter).forEach(list => {
        if (list.length > 1) {
          custom.push(validator.sameValues(list));
        }
      });
    }
    return {
      required: requiredFields,
      custom,
    };
  };

  clearForm = () => {
    this.setState({
      emails: [
        {
          index: 0,
          email: '',
        },
      ],
      maxItems: false,
    });
  };

  handleInputChange = id => e => {
    const {value} = e.target;
    const newEmails = [...this.state.emails];
    newEmails[id].email = value;
    this.setState({
      emails: newEmails,
    });
  };

  handleAddClick = () => {
    const newItemId = this.state.emails.length;
    if (newItemId === 9) {
      this.setState({
        maxItems: true,
      });
    }

    const newEmails = [...this.state.emails];
    newEmails[newItemId] = {
      index: newItemId,
      email: '',
    };

    this.setState({
      emails: newEmails,
    });
  };

  handleSubmit = () => {
    const {errors} = validator.validate(this.validator(), this.state.emails.map(item => item.email));
    const newErrors = Object.keys(errors).map(key => ({value: errors[key], index: key}));
    this.setState({errors: newErrors});

    if (!newErrors.length) {
      const dataToSend = this.state.emails.filter(item => item.email);
      this.props.setReferFriendInfo(dataToSend);
    }
  };

  render() {
    return (
      <ReferFriendView
        onInputChange={this.handleInputChange}
        emails={this.state.emails}
        onAddClick={this.handleAddClick}
        maxItems={this.state.maxItems}
        onSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

ReferFriendContainer.propTypes = {

};

const mapStateToProps = ({referFriendReducer}) => ({
  referFriendMsg: referFriendReducer.referFriendMsg,
  referFriendStatus: referFriendReducer.referFriendStatus,
  errors: referFriendReducer.errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setReferFriendInfo: setReferFriendInfo.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReferFriendContainer);
