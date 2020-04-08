import React, {useEffect} from 'react';
import {Button, Input} from '../../../controls';
import {AuthFormView, MapGoogle, StepsIndicator} from '../../../common';
import styles from '../PortfolioCreateStyles.scss';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Autocomplete from 'react-google-autocomplete';
import {useState} from 'react';
import moment from "moment";

export const RenderSecondStep = ({
                                   portfolio,
                                   isOld,
                                   changeStep,
                                   onChange,
                                   errors,
                                   onChangeDate,
                                   submitPortfolio,
                                   fieldsPortfolio,
                                   onLocation, isShowPostalCode,
                                   getPortfolio,
                                   fullAddress,
                                 }) => {
  const [address, setAddress] = useState({
    lat: 0,
    lng: 0,
    zoom: 1,
    showMap: false,
  });

  useEffect(() => {
    if (!portfolio) {
      getPortfolio();
    }
  }, []);

  const onSelectedLocationHandler = place => {
    place.geometry &&
    setAddress({
      lat: +place.geometry.location.lat(),
      lng: +place.geometry.location.lng(),
      zoom: 12,
      showMap: true,
    });
    onLocation(place);
  };

  const date = fieldsPortfolio['applicants.identity.dateOfBirth'];
  const formatDate = new Date(date.replace(' ', 'T'));

  const CustomInput = props => {
    const {label, error, size } = props;
    return (
        <div className={styles.container}>
          <div className={styles.input__header}>
            <div className={`${styles.label} ${styles[size]}`}>
              {label}
            </div>
          </div>
          <div className={`${styles.input__container} ${styles[size]}`}>
            <input
                className={`${styles.input} ${error ? styles.input_error: ''}`}
                onClick={props.onClick}
                value={props.value}
                type="text"
                readOnly={true}
            />
          </div>
        </div>

    )
  }

  return (
    <div className={`${styles.pt} auth__background justify-content-center`}>
      <AuthFormView>
        <div className='d-flex flex-wrap mx-md-n1'>
          <div className='col-sm-6 px-1'>
            <div className='auth__inputWrapper'>
              <div className={styles.dateWrapper}>
                <DatePicker
                  selected={date ? formatDate : new Date(moment().subtract(18, 'years'))}
                  onChange={onChangeDate('applicants.identity.dateOfBirth')}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  customInput={
                      <CustomInput label={'Date of Birth'} />
                  //   <Input type='text'
                  //                     id={'Date-Picker-custom'}
                  //                     onChange={onChange('date')}
                  //                     label={'Date of Birth'}
                  //                     readOnly={true}
                  //                     readonly
                  //                     disabled={true}
                  //                     onClick={e => e.stopPropagation()}
                  //                     error={errors['applicants.identity.dateOfBirth']}
                  // />
                  }
                  onChangeRaw={e => {e.preventDefault(); e.stopPropagation()}}
                />
              </div>
            </div>
          </div>

          <div className='col-sm-6 px-1'>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                placeholder={'XXX-XX-XXXX'}
                onChange={onChange('applicants.identity.socialSecurityNumber')}
                value={fieldsPortfolio['applicants.identity.socialSecurityNumber']}
                label={'Social Security Number'}
                error={errors['applicants.identity.socialSecurityNumber']}
              />
            </div>
          </div>
        </div>

        <div className={`auth__inputWrapper
        ${styles.autocompleteWrapper}
        ${errors['userAddress'] ? styles.error : ''}`}>
          <span className={styles.label}>Address</span>
          {/*<span className={styles.labelPlaceholder}>*start with postal code</span>*/}
          <Autocomplete
            placeholder={''}
            onInput={onChange('userAddress')}
            onChange={onChange('userAddress')}
            defaultValue={fullAddress(fieldsPortfolio)}
            onPlaceSelected={onSelectedLocationHandler}
            types={['address']}
            componentRestrictions={{country: "us"}}
          />
          {errors['userAddress'] &&
          <div className={styles.errorMessage}>{errors['userAddress']}</div>
          }
        </div>
        {/*{*/}
        {/*  isShowPostalCode &&*/}
        {/*  <div className={'auth__inputWrapper'}>*/}
        {/*    <Input*/}
        {/*      type='text'*/}
        {/*      value={fieldsPortfolio['applicants.contact.homeAddress.postalCode']}*/}
        {/*      onChange={onChange('applicants.contact.homeAddress.postalCode')}*/}
        {/*      label={'Postal Code'}*/}
        {/*      error={errors['applicants.contact.homeAddress.postalCode']}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*}*/}
        <div className={'auth__inputWrapper'}>
          <Input
            type='text'
            placeholder={'XXX-XXX-XXXX'}
            value={fieldsPortfolio['applicants.contact.phoneNumbers']}
            onChange={onChange('applicants.contact.phoneNumbers')}
            label={'Phone Number'}
            error={errors['applicants.contact.phoneNumbers']}
          />
        </div>
        {address.showMap &&
        <div className={'auth__inputWrapper'}>
          <MapGoogle
            isMarkerShown
            zoom={address.zoom}
            lat={address.lat}
            lng={address.lng}
            containerElement={
              <div style={{height: '300px'}}/>
            }
            mapElement={
              <div style={{height: '300px'}}/>
            }
          />
        </div>
        }
        {
          isOld &&
          <>
            <p className={`${styles.form__notify} mb-5`}>
              You are 65 or older and according to FINRA rule 4512 it`s required to provide trusted contact person.
            </p>
            <div className='d-flex flex-wrap mx-md-n1'>
              <div className='col-sm-6 px-1'>
                <div className={'auth__inputWrapper'}>
                  <Input
                    type='text'
                    value={fieldsPortfolio['trustedContactForm.givenName']}
                    defaultValue={fieldsPortfolio['trustedContactForm.givenName']}
                    onChange={onChange('trustedContactForm.givenName')}
                    label={'First Name'}
                    error={errors['trustedContactForm.givenName']}
                  />

                </div>
              </div>
              <div className='col-sm-6 px-1'>
                <div className={'auth__inputWrapper'}>
                  <Input
                    type='text'
                    value={fieldsPortfolio['trustedContactForm.familyName']}
                    defaultValue={fieldsPortfolio['trustedContactForm.familyName']}
                    onChange={onChange('trustedContactForm.familyName')}
                    label={'Last Name'}
                    error={errors['trustedContactForm.familyName']}
                  />
                </div>
              </div>
            </div>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                defaultValue={fieldsPortfolio['trustedContactForm.emailAddress']}
                onChange={onChange('trustedContactForm.emailAddress')}
                label={'Email Address'}
                error={errors['trustedContactForm.emailAddress']}
              />
            </div>
            <div className={'auth__inputWrapper'}>
              <Input
                type='text'
                placeholder={'XXX-XXX-XXXX'}
                value={fieldsPortfolio['trustedContactForm.phoneNumber.phoneNumber']}
                onChange={onChange('trustedContactForm.phoneNumber.phoneNumber')}
                label={'Phone Number'}
                error={errors['trustedContactForm.phoneNumber.phoneNumber']}
              />
            </div>
          </>
        }
        <div className={'auth__btnWrapper d-flex justify-content-between'}>
          <div className={styles.nextButton}>
            <Button
              title={'Prev'}
              onClick={() => changeStep(false)}
              transparent
              size={'md'}
            />
          </div>
          <div className={styles.nextButton}>
            <Button
              title={'Next'}
              onClick={() => submitPortfolio()}
              size={'md'}
            />
          </div>
        </div>
      </AuthFormView>
    </div>
  );
};
