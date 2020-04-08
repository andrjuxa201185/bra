import React from 'react';
import styles from './ActivityStyles.scss';
import {Input, Spinner} from '../../../controls';
import DatePicker from 'react-datepicker';
import {OopsView} from '../../../common';

class ActivityView extends React.Component {

  render() {
    const {startDate, endDate, onChangeDate, getFormattedDate, activitiesData, dataStatus, handleDate} = this.props;

    if (dataStatus.loading) {
      return <Spinner size='lg'/>;
    }

    if (dataStatus.fail || dataStatus.fail) {
      return <OopsView/>;
    }
    return (
      <div className={`${styles.activityTable} panel`}>
        <div className={styles.dateContainer}>
          <div className={styles.datePickerWrap}>
            <DatePicker
              dateFormat='MM/dd/yyyy'
              selected={startDate}
              onChange={onChangeDate(true)}
              maxDate={endDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              customInput={<Input type='text'
                                  label={'Date Range:'}
              />}
            />
          </div>
          <span className={styles.divider}>—</span>
          <div className={styles.datePickerWrap}>
            <DatePicker
              dateFormat='MM/dd/yyyy'
              selected={endDate}
              onChange={onChangeDate(false)}
              minDate={startDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              customInput={<Input type='text'
                                  className={styles.dateInput}
              />}
            />
          </div>
        </div>
          {
            dataStatus.loaded && activitiesData && activitiesData && activitiesData.length ?
              <table className='table'>
                <thead>
                <tr>
                  <th align='left' scope='col'>Date</th>
                  <th align='left' scope='col'>Fund</th>
                  <th align='left' scope='col'>Activity</th>
                  <th align='left' scope='col'>Amount</th>
                </tr>
                </thead>
                <tbody>
                  {activitiesData.map((item, i) => (
                    <tr key={i}>
                      <td align='left'><b>{handleDate(item.date)}</b></td>
                      <td align='left' scope='row'><b>{item.folioName}</b></td>
                      <td align='left'><b>{item.transactionDesc || item.subCategoryName}</b></td>
                      <td align='left' scope='row'><b>${item.net}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              :
              <>
                <table className='table'>
                  <thead>
                  <tr>
                    <th align='left' scope='col'>Date</th>
                    <th align='left' scope='col'>Fund</th>
                    <th align='left' scope='col'>Activity</th>
                    <th align='left' scope='col'>Amount</th>
                  </tr>
                  </thead>
                </table>
                <div className={styles.emptyState}>
                  <h3>No activity found.</h3>
                  <p>Adjust your filters to find transactions</p>
                </div>
              </>
          }
      </div>
    );
  }
}

export default ActivityView;
