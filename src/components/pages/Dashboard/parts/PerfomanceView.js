import React from 'react';
import styles from './ActivityStyles.scss';
import {Input, Spinner} from '../../../controls';
import DatePicker from 'react-datepicker';
import {OopsView} from '../../../common';

class PerfomanceView extends React.Component {

    render() {
        const {startDate, endDate, onChangeDate, activitiesData, dataStatus} = this.props;

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
            </div>
        );
    }
}

export default PerfomanceView;
