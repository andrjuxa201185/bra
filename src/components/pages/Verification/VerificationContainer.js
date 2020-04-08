import React from "react";
import PropTypes from "prop-types";
import { verification } from "../../../store/auth/authActions";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import {mobileAndTabletCheck} from '../../../utils/';
import styles from "./VerificationStyles.scss";

class VerificationContainer extends React.Component {
  state = {
    isChecked: false,
    isShowBtn: false,
    data: {
      hash: "",
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.hash !== this.state.data.hash) {
      // handle link received when registered with mobile app
      const isMobileDevice = mobileAndTabletCheck();
      const hasProvider = /provider/.test(window.location.href);
      if (isMobileDevice && hasProvider) {
        this.setState({ isShowBtn: true });
      } else this.props.verification(this.state.data);
    }
  }

  componentDidMount() {
    const hash = this.props.match.params.id;
    this.setState({ isChecked: false, data: { hash } });
  }

  render() {
    const { isShowBtn } = this.state;
    return (
      <div className={styles.container}>
        {isShowBtn ? (
          <div className={styles.button}>
            <a
              href={`brains://account-verification/${this.state.data.hash}`}
              className={styles.link}
            >
              Open in App
            </a>
          </div>
        ) : (
          <div>
            <h2>verification...</h2>
          </div>
        )}
      </div>
    );
  }
}

VerificationContainer.propTypes = {
  verification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      verification: verification.request,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(VerificationContainer);
