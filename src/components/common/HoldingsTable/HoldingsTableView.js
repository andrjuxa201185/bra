import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import {Modal} from '..';
import {getFundsHoldings} from '../../../store/userProfile/userProfileActions';

// import styles from './styles';

const HoldingsTableView = ({isOpen, closeModal, getFundsHoldings}) => {
  const [data, setData] = useState(null);
  const [dataStatus, setDataStatus] = useState('INIT');

  useEffect(() => {
    if (!data) {
      getFundsHoldings(({data, isSuccess}) => {
        //setData(data);
        if (isSuccess) {
          setData(data);
          setDataStatus('OK');
        } else {
          setDataStatus('ERROR');
        }
      });
    }
  });

  const transformData = data => {
    const newData = [];
    data.forEach((item, index, arr) => {
      if (arr[index-1]) {
        if (arr[index-1].fund_name === item.fund_name) {
          newData.push({
            ...item,
            fund_name: '',
          });
          return;
        }
      }
      newData.push(item);
    });
    return newData;
  };

  const renderContent = () => {
    if (dataStatus === 'ERROR') {
      return <div>We are sorry. Seems there are some problems with connection</div>;
    }
    if (data) {

      return (
        <div style={{maxHeight: '300px'}}>
          <table className="table">
            <thead>
            <tr>
              <th align='left' scope="col">Fund Name</th>
              <th align='left' scope="col">Company Name</th>
              <th align='left' scope="col">Symbol</th>
            </tr>
            </thead>
            <tbody>
            {
              transformData(data).map((item, index) => {
                return (
                  <tr key={index}>
                    <td align='left' scope='row'><b>{item.fund_name}</b></td>
                    <td align='left'>{item.company_name}</td>
                    <td align='left'>{item.symbol}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      );
    }
    return <div/>;
  };

  return (
    <Modal
      title={'Fund Holdings'}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      {renderContent()}
    </Modal>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getFundsHoldings,
}, dispatch);

HoldingsTableView.propTypes = {
  getFundsHoldings: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(HoldingsTableView);

