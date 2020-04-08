import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import {text, button, img} from './ModalStyles.scss';
import { hideAlert } from '../../../store/alert/alertActions';
import Button from "../../controls/Button/ButtonView";
import ModalView from './ModalView';

class AlertView extends PureComponent {
  render() {
    const {isOpen, title, msg, hideAlert} = this.props;
    return (
      <ModalView
        title={title}
        isOpen={isOpen}
        closeModal={hideAlert}
      >
        <div className='d-flex justify-content-center align-items-center'>
          {
            title.toLowerCase() === 'success' &&
            (
              <div className={img}>
                <img src={require('../../../assets/images/icons/big-done-icon.png')} alt='' />
              </div>
            )
          }
          <div className='d-flex justify-content-center flex-column align-items-start'>
            <p className={text}>{msg}</p>
            <div className={button}>
              <Button
                onClick={hideAlert}
                title={'OK'}
                size={'md'}
              />
            </div>
          </div>
        </div>
      </ModalView>
    );
  }
}

AlertView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  //action
  hideAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({alert: {isOpen, title, msg}}) => ({
  isOpen, title, msg,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertView);
