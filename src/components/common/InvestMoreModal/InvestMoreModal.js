import React from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import NumberFormat from "react-number-format";
import {Input, Spinner} from "../../controls";
import styles from "../../common/Modal/ModalStyles.scss";
import Button from "../../controls/Button/ButtonView";
import Modal from "../../common/Modal/ModalView";
import {CirculsQuestion} from "../../common";
import {transferBuy} from "../../../store/transferBuy/transferBuyActions";
import {showAlert} from "../../../store/alert/alertActions";

const initialRadioData = [
  {
    id: 1,
    name: 'Current portfolio mix',
    value: 'current',
    checked: true,
  },
  {
    id: 2,
    name: 'New World View/Interests fund mix you just created ',
    value: 'basic',
    checked: false,
  },
  {
    id: 3,
    name: 'New “Build Your Own” fund mix you just created',
    value: 'tailored',
    checked: false,
  },
];

class InvestMoreModal extends React.Component {
  state = {
    amount: '',
    radioData: initialRadioData,
  };

  handleHideModal = () => {
    console.log('close');
    this.setState({ radioData: initialRadioData, amount: ''});
    this.props.onClose();
  };

  onAmountChange = value => {
    this.setState({amount: value});
  };

  handleSelect = answerId => e => {
    e.preventDefault();
    let newRadioData = this.state.radioData;
    for (let item in newRadioData) {
      newRadioData[item].checked = false;
    }
    const selectedItem = newRadioData.find(radio => radio.id === answerId);
    if (selectedItem) {
      selectedItem.checked = true;
      this.setState({ radioData: newRadioData });
    }
  };

  handleTransferBuy = () => {
    const {amount, radioData} = this.state;
    if (amount) {
      const selectedItem = radioData.find(item => item.checked);
      if (selectedItem) {
        this.props.transferBuy({amount: this.state.amount, invest_to: selectedItem.value});
      }
    }
    this.setState({ amount: '', radioData: initialRadioData});
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dataStatus.loaded !== this.props.dataStatus.loaded && this.props.dataStatus.loaded) {
      this.handleHideModal();
      this.props.showAlert({title: 'Success!', msg: 'Successfully sent!'});
    }
  };

  render() {
    return (
      <>
        <Modal
          title={'Invest More'}
          isOpen={this.props.open}
          closeModal={this.handleHideModal}
        >
          {
            this.props.dataStatus.loading ?
              <Spinner size='lg'/> :
            <>
              <div className='mb-4'>
                <h3 className='mb-4'>How much money would you like to transfer today?</h3>
                <NumberFormat
                  value={this.state.amount}
                  thousandSeparator
                  prefix={'$'}
                  placeholder='$'
                  customInput={Input}
                  onValueChange={({value}) => this.onAmountChange(value)}
                />
              </div>
              <div className='mb-4'>
                <h3 className='mb-4'>Invest these funds in:</h3>
                <CirculsQuestion
                  options={this.state.radioData}
                  onClick={this.handleSelect}
                  secondary
                />
              </div>
              <p className={styles.textInfo}>
                Please create your new World View/Interests or Build Your Own fund mix before transferring funds from your bank
              </p>
              <div className='d-flex justify-content-center'>
                <div className={styles.button}>
                  <Button
                    onClick={this.handleTransferBuy}
                    title={'Submit'}
                    size={'md'}
                    transparent
                  />
                </div>
              </div>
            </>
          }
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({
                           transferBuy: {data, dataStatus },
                         }) => ({
  data,
  dataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  transferBuy: transferBuy.request,
  showAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestMoreModal);
