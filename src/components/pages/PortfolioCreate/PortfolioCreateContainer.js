import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import PortfolioCreateView from './PortfolioCreateView';
import {getQuestions, setAnswers} from '../../../store/onboardingQuestion/onboardingQuestionActions';
import {getPortfolio, setPortfolio} from '../../../store/onboardingPortfolio/onboardingPortfolioActions';
import {getUserProfile} from '../../../store/userProfile/userProfileActions';
import {registration} from "../../../store/auth/authActions";
import {setPlaidInfo} from "../../../store/plaid/plaidActions";
import {getSettings} from "../../../store/settings/settingsActions";
import {getOnboarding} from "../../../store/onboarding/onboardingActions";
import {getOnboardingInvest, setOnboardingInvest} from "../../../store/onboardingInvest/onboardingInvestActions";
// import {getTraiderStatus} from "../../../store/traiderStatus/traiderStatusActions";
import {checkFolioStatus, setFolioSignature, cleanFolioStatus} from "../../../store/folio/folioActions";

import {OopsView} from "../../common";
import {globals} from "../../../store/globals";
import * as validator from "../../../helpers/validator";
import {selectQuestions} from "../../../helpers/selectors";
import {trimFieldsData} from "../../../utils";
import {Spinner} from "../../controls";
import {CURRENT_PORTFOLIO, RECOMMENDED_PORTFOLIO} from "../../../navigation/routes";
import {withHandlers} from "./withHandlers";
import {getCurrentPortfolio} from "../../../store/currentPortfolio/currentPortfolioActions";

class PortfolioCreateContainer extends Component {
  state = {
    currentStep: 0,
    portfolioToSend: {},
    isOld: false,
    isYoung: false,
    isShowPostalCode: false,
    fieldsProfile: null,
    fieldsPortfolio: {
      'applicants.identity.dateOfBirth': '',
      'applicants.identity.socialSecurityNumber': '',
      'trustedContactForm.givenName': '',
      'trustedContactForm.familyName': '',
      'trustedContactForm.emailAddress': '',
      'trustedContactForm.phoneNumber.phoneNumber': '',
    },
    investQuestionData: null,
    investValue: 0,
    errors: {},
    isShowCompanySymbols: false,
    isShowFirmName: false,
    isShowOrganization: false,
    isShowFamily: false,
    isShowExperienceSector: false,
    isShowEmployment: false,
  };

  componentDidMount() {
    this.setProfileData();
    this.setFieldsPortfolioFromServer();
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    this.props.getOnboarding();
    this.props.getSettings();
  }

  componentWillUnmount() {
    document.body.style.height = '';
    document.body.style.overflow = '';
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.portfolio !== this.props.portfolio) {
      this.setFieldsPortfolioFromServer();
    }
    this.setQuestionDataToState(prevProps);
    this.setStartIsOldFieldPortfolio(prevState);
    if (prevProps.user !== this.props.user) {
      this.setProfileData();
    }
    if (prevProps.onboardingDataStatus !== this.props.onboardingDataStatus) {
      if (this.props.onboardingDataStatus && this.props.onboardingDataStatus.loaded) {
        this.setInitialCurrentStep(this.props.onboardingData.page, this.props.onboardingData.step);
      }
    }
    if (prevProps.onboardingInvestDataStatus !== this.props.onboardingInvestDataStatus) {
      if (this.props.onboardingInvestDataStatus && this.props.onboardingInvestDataStatus.loaded) {
        this.getInvestQuestionInfo(this.props.onboardingInvestData.data);
      }
    }
    if (prevProps.setInvestDataStatus !== this.props.setInvestDataStatus) {
      if (this.props.setInvestDataStatus && this.props.setInvestDataStatus.loaded) {
        this.changeStep(true);
      }
    }
    // if (prevProps.folioCheckDataStatus !== this.props.folioCheckDataStatus) {
    //   if (this.props.folioCheckDataStatus && this.props.folioCheckDataStatus.loaded) {
    //     if (this.props.folioCheckData && this.props.folioCheckData.tradier_status) {
    //       this.changeStep(true);
    //     }
    //   }
    // }

    // console.log('-----STATE-----:', this.state);
  }

  setFieldsPortfolioFromServer() {
    if (!this.props.portfolio) return false;

    const values = Object.values(this.props.portfolio).reduce((acc, current) => {
      let value;
      if (current.name === 'applicants.contact.phoneNumbers') {
        // eslint-disable-next-line
        value = current.answers['3'].value;
      } else if (current.name === 'userAddress') {
        value = Object.values(current.answers).reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: curr.value,
          };
        }, {});
      } else {
        // eslint-disable-next-line
        value = current.answers.value;
      }

      return {
        ...acc,
        [current.name]: value,
      };
    }, {});

    this.setState({
      fieldsPortfolio: {
        ...this.state.fieldsPortfolio,
        ...values,
      },
    });
  }

  getInvestQuestionInfo = data => {
    const investQuestionData = Object.values(data);
    this.setState({investQuestionData});
    this.setState({investValue: investQuestionData[0].answers.value});
  };

  handleClickNavTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  navTo = route => {
    globals.history.push(route);
  };

  setInitialCurrentStep = (page, step) => {
    switch (page) {
      case 'welcome':
        this.setState({currentStep: 2});
        break;
      case 'folio_account':
        this.setState({currentStep: 3});
        break;
      case 'page_2':
        this.setState({currentStep: 4});
        break;
      case 'page_3':
        if (step === 1) {
          this.setState({currentStep: 5});
        }
        if (step === 2) {
          this.setState({currentStep: 6});
        }
        if (step === 3) {
          this.setState({currentStep: 7});
        }
        break;

      case 'folio_bank_link':
        this.setState({currentStep: 8});
        break;

      case 'agreement':
        this.setState({currentStep: 9});
        break;

      case 'portfolio':
        this.navTo(RECOMMENDED_PORTFOLIO);
        break;
      default:
        this.setState({currentStep: 1});
    }
  };

  onLocationHandler = place => {
    const types = {
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'short_name',
      postal_code: 'short_name',
    };
    const translator = {
      country: [5, 'country'],
      route: [4, 'address'],
      postal_code: [3, 'postal'],
      locality: [1, 'city'],
      administrative_area_level_1: [2, 'state'],
    };
    const result = {};

    for (let i = 0; i < place.address_components.length; i++) {
      let [addressType] = place.address_components[i].types;
      if (types[addressType]) {
        let value = place.address_components[i][types[addressType]];
        result[translator[addressType][0]] = {value};
      }
    }

    if (!result[1]) {
      // result[21] = {value: result[22] && result[22].value};
      result[1] = {value: Object.values(place.address_components).filter(item => item.types[0] === 'administrative_area_level_1')[0].long_name};
    }

    result[3]
      ? this.setState({isShowPostalCode: false})
      : this.setState({isShowPostalCode: true});


    const {portfolio} = this.props;
    const [key] = Object.values(portfolio || {}).filter(item => item.name === 'userAddress');

    this.setState({
      fieldsPortfolio: {
        ...this.state.fieldsPortfolio,
        userAddress: {
          address: result[4] && result[4].value || '',
          country: result[3] && result[3].value || '',
          city: result[1] && result[1].value || '',
          state: result[2] && result[2].value || '',
          postal: result[5] && result[5].value || '',
        }
      },
      portfolioToSend: {
        ...this.state.portfolioToSend,
        [key.id]: result,
      },
    });
  };

  getAge = birthDate => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  setStartIsOldFieldPortfolio(prevState) {
    if (prevState.fieldsPortfolio['applicants.identity.dateOfBirth'] !==
      this.state.fieldsPortfolio['applicants.identity.dateOfBirth']) {
      this.setState({
        ...this.state,
        isOld: this.getAge(new Date(this.state.fieldsPortfolio['applicants.identity.dateOfBirth'])) >= 65,
        isYoung: this.getAge(new Date(this.state.fieldsPortfolio['applicants.identity.dateOfBirth'])) < 18,
      });
    }
  }

  setQuestionDataToState(prevProps) {
    const {questionsData, answers, questions} = this.props;
    if (prevProps.questionsData !== questionsData || prevProps.answers !== answers || prevProps.questions !== questions) {
      const {questionsData} = this.props;

      this.checkAdditionalQuestions(Object.values(questionsData).find(el => el.name === "applicants.disclosures.isAffiliatedExchangeOrFINRA"), 'isShowFirmName');
      this.checkAdditionalQuestions(Object.values(questionsData).find(el => el.name === "applicants.disclosures.isControlPerson"), 'isShowCompanySymbols');
      this.checkAdditionalQuestions(Object.values(questionsData).find(el => el.name === "applicants.disclosures.isPoliticallyExposed"), 'isShowOrganization', 'isShowFamily');
      this.checkAdditionalQuestions(Object.values(questionsData).find(el => el.name === 'previousPrivatePlacementExperience'), 'isShowExperienceSector');
      this.checkAdditionalQuestions(Object.values(questionsData).find(el => el.name === 'applicants.employment.employmentStatus'), 'isShowEmployment');
    }
  }

  setProfileData() {
    const {user} = this.props;
    user && this.setState({
      fieldsProfile: {
        ...this.state.fieldsProfile,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        username: '',
      },
    });
  }

  submitAnswers = () => {
    const {answers} = this.props;
    if (Object.values(answers).length) {
      this.props.setAnswers(answers, () => {
        this.props.resetAnswers();
        this.changeStep(true);
      });
    } else {
      this.changeStep(true);
    }
  };

  onInit = handler => {
    this.plaidInit = handler;
    this.plaidInit.open();
  };

  submitPortfolio = () => {
    const {portfolioToSend} = this.state;
    const validatFieldIsOld = [
      'trustedContactForm.givenName',
      'trustedContactForm.familyName',
      'trustedContactForm.emailAddress',
      'trustedContactForm.phoneNumber.phoneNumber',
    ];
    const validatFormatIsOld = [
      validator.phone(['trustedContactForm.phoneNumber.phoneNumber']),
      validator.email(['trustedContactForm.emailAddress']),
      validator.name(['trustedContactForm.givenName']),
      validator.name(['trustedContactForm.familyName']),
    ];
    const validatRule = {
      required: [
        'applicants.identity.socialSecurityNumber',
        'applicants.identity.dateOfBirth',
        'userAddress',
        'applicants.contact.phoneNumbers',
      ],
      custom: [
        validator.ssn(['applicants.identity.socialSecurityNumber']),
        validator.phone(['applicants.contact.phoneNumbers']),
        validator.addressFull(['userAddress']),
        validator.address(['userAddress']),
      ],
    };

    if (this.state.isOld) {
      validatRule.required = [...validatRule.required, ...validatFieldIsOld];
      validatRule.custom = [...validatRule.custom, ...validatFormatIsOld];
    }

    let {errors} = validator.validate(validatRule, this.state.fieldsPortfolio);
    if (this.state.isYoung) {
      errors = {
        ...errors,
        'applicants.identity.dateOfBirth': 'Your are under 18 years',
      };
    }
    this.setState({errors});

    if (!Object.keys(errors).length) {
      if (Object.keys(portfolioToSend).length) {
        this.props.setPortfolio(portfolioToSend, () => {
          this.setState({
            ...this.state,
            portfolioToSend: {},
            fieldsPortfolio: {
              ...this.state.fieldsPortfolio,
              'applicants.identity.socialSecurityNumber': '',
            },
          });
        });
        this.changeStep(true);

        // this.plaidInit.open();
        return;
      }
      // this.plaidInit.open();

    }

  };

  submitProfileData = () => {
    const validatRule = {
      required: ['username', 'password', 'repeat_password', 'isAgree'],
      custom: [
        validator.samePasswords(['password', 'repeat_password']),
        validator.password(['password']),
      ],
    };
    const {registration} = this.props;
    const {fieldsProfile} = this.state;

    const {errors} = validator.validate(validatRule, this.state.fieldsProfile);
    this.setState({errors});

    if (!Object.keys(errors).length) {
      registration({...trimFieldsData(fieldsProfile)}, () => {
        this.props.getUserProfile();
        this.changeStep(true);
      });
    }
  };

  _formatedNum(val, count, separ1, separ2) {
    let arr = val.trim().split('');
    const num = Number(arr[arr.length - 1]);
    if (!Number.isInteger(+num)) {
      arr.pop();
    }
    arr = arr.filter(item => Number.isInteger(+item) && item !== ' ');
    separ1 && arr.length > separ1 - 1 && arr.splice(separ1, 0, '-');
    separ2 && arr.length > separ2 - 1 && arr.splice(separ2, 0, '-');
    arr.length > count && arr.splice(count, 1);

    return arr.join('');
  }

  _formatedNotNum(val) {
    const rFullName = /[^a-zA-Z\s]/g;
    return val.replace(rFullName, '');
  }

  handleChange = field => e => {
    const {portfolio} = this.props;
    const {checked, value, type} = e.target;
    let val = type === 'checkbox' ? checked : value;
    const [key] = Object.values(portfolio || {}).filter(item => item.name === field);
    if (field === 'applicants.identity.socialSecurityNumber' && val.length) {
      if (val.length > this.state.fieldsPortfolio['applicants.identity.socialSecurityNumber'].length) {
        val = this._formatedNum(val, 11, 3, 6,);
      }
    }

    if (field === 'trustedContactForm.givenName' && val.length) {
      val = this._formatedNotNum(val);
    }

    if (field === 'trustedContactForm.familyName' && val.length) {
      val = this._formatedNotNum(val);
    }

    if (field === 'applicants.contact.phoneNumbers' && val.length) {
      if (val.length > this.state.fieldsPortfolio['applicants.contact.phoneNumbers'].length) {
        val = this._formatedNum(val, 12, 3, 7,);
      }
      this.setState({
        fieldsPortfolio: {...this.state.fieldsPortfolio, [field]: val},
        errors: {},
        portfolioToSend: {
          ...this.state.portfolioToSend,
          [key.id]: {'3': {'value': val}},
        },
      });
      return;
    }

    if (field === 'trustedContactForm.phoneNumber.phoneNumber' && val.length > 0) {
      if (val.length > this.state.fieldsPortfolio['trustedContactForm.phoneNumber.phoneNumber'].length) {
        val = this._formatedNum(val, 12, 3, 7);
      }
    }

    if (field === 'userAddress') {
      if (val === '') {
        this.setState({
          fieldsPortfolio: {
            ...this.state.fieldsPortfolio,
            [field]: {},
          },
        });
      }
      return;
    }

    if (key) {
      this.setState({
        fieldsPortfolio: {...this.state.fieldsPortfolio, [field]: val},
        errors: {},
        portfolioToSend: {
          ...this.state.portfolioToSend,
          [key.id]: {'value': val},
        },
      });
      return;
    }
    this.setState({
      fieldsProfile: {...this.state.fieldsProfile, [field]: val},
      errors: {},
    });
  };

  handleChangeDate = field => date => {
    if (!date) {
      return;
    }
    let formatDate = date && `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    // console.log(formatDate, date.getMonth(), ((date.getMonth() + 1)));
    // const now = new Date().getFullYear();
    const {portfolio} = this.props;
    const [key] = Object.values(portfolio).filter(item => item.name === field);
    if (key) {
      this.setState({
        fieldsPortfolio: {...this.state.fieldsPortfolio, [field]: formatDate},
        errors: {},
        isOld: this.getAge(date) >= 65,
        isYoung: this.getAge(date) < 18,
        portfolioToSend: {
          ...this.state.portfolioToSend,
          [key.id]: {'value': formatDate},
        },
      });
      return;
    }
    this.setState({
      fieldsPortfolio: {...this.state.fieldsPortfolio, [field]: formatDate},
      errors: {},
      // isOld: 569790 < Math.ceil((new Date - date) / (1000 * 3600)),
      isOld: this.getAge(date) >= 65,
    });
  };

  handleInvestInputChange = value => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      this.setState({investValue: value});
    }
  };
  sendInvestQuestionData = () => {
    if (this.state.investValue) {
      const investId = Object.values(this.state.investQuestionData)[0].id;
      const investData = {[investId]: {value: this.state.investValue}};
      this.props.setOnboardingInvest(investData);
      // this.changeStep(true);
    }
  };

  _setAnsweredQuestionNumber = questions => {
    let result = 0;
    Object.values(questions).forEach(item => {
      if (item.isAnswered) result++;
    });
    return result;
  };
  changeStep = isNext => {
    const {currentStep} = this.state;
    if (isNext && currentStep < 11) {
      this.setState({currentStep: currentStep + 1});
    } else if (!isNext && currentStep !== 1) {
      this.setState({currentStep: currentStep - 1});
    }
    window.scrollTo(0, 0);
  };

  checkAdditionalQuestions = (question, ...fields) => {
    if(question.name === 'applicants.employment.employmentStatus') {
      question.answers['1'].checked || question.answers['2'].checked ? fields.forEach(field => this.setState({[field]: true})) : fields.forEach(field => this.setState({[field]: false}));
    } else {
      question.answers['1'].checked ? fields.forEach(field => this.setState({[field]: true})) : fields.forEach(field => this.setState({[field]: false}));
    }

  };

  handleGetCurrentPortfolio = navTo => {
    setTimeout(() => {
      this.props.getCurrentPortfolio();
    }, 5000);
    this.handleClickNavTo(CURRENT_PORTFOLIO);
  };


  fullAddress = (fieldsPortfolio, type) => {
    const { userAddress } = fieldsPortfolio;
    // console.log('userAddress', userAddress)
    return userAddress && `${
      userAddress['address'] ? userAddress['address'] + ', ' : ''
    }${
      userAddress['city'] ? userAddress['city'] + ', ' : ''
    }${
      userAddress['state'] ? userAddress['state'] + ', ' : ''
    }${
      userAddress['postal'] ? userAddress['postal'] + ', ' : ''
    }${
      userAddress['country'] ? userAddress['country'] : ''
    }`;
  };

  render() {
    const {
      questionsDataStatus,
      portfolioDataStatus,
      dataStatus,
      setPlaidInfo,
      settingsData,
      onboardingData,
      onboardingDataStatus,
      onboardingInvestData,
      folioCheckData,
      checkFolioStatus,
      setPortfolioDataStatus,
      submitSignature,
      folioSignatureData,
      cleanFolioStatus,
      questions,
      radioHandler,
      inputHandler,
      inputsHandler,
      checkboxHandler,
      addressInputChange,
      folioSignatureStatus,
    } = this.props;

    const {currentStep, isShowPostalCode} = this.state;

    if (questionsDataStatus.fail || portfolioDataStatus.fail || dataStatus.fail || onboardingDataStatus.fail || setPortfolioDataStatus.fail) {
      return <OopsView/>;
    }

    if (onboardingDataStatus && onboardingDataStatus.loading) {
      return <Spinner size='lg'/>;
    }
    // console.log(this.state.errors);
    return (
          <PortfolioCreateView
            getQuestions={this.props.getQuestions}
            getPortfolio={this.props.getPortfolio}
            getOnboardingInvest={this.props.getOnboardingInvest}
            portfolio={this.props.portfolio}
            investQuestionData={this.state.investQuestionData}
            submitProfileData={this.submitProfileData}
            user={this.props.user}
            dataStatus={this.props.dataStatus}
            checkboxHandler={checkboxHandler}
            changeStep={this.changeStep}
            radioHandler={radioHandler}
            inputHandler={inputHandler}
            inputsHandler={inputsHandler}
            addressInputChange={addressInputChange}
            navTo={this.handleClickNavTo}
            currentStep={currentStep}
            onChange={this.handleChange}
            onChangeDate={this.handleChangeDate}
            investValue={this.state.investValue}
            onInvestInputChange={this.handleInvestInputChange}
            sendInvestQuestionData={this.sendInvestQuestionData}
            errors={this.state.errors}
            questionsData={questions}
            questionsDataStatus={questionsDataStatus}
            portfolioDataStatus={portfolioDataStatus}
            isOld={this.state.isOld}
            submitAnswers={this.submitAnswers}
            submitPortfolio={this.submitPortfolio}
            fieldsPortfolio={this.state.fieldsPortfolio}
            onLocation={this.onLocationHandler}
            isShowPostalCode={isShowPostalCode}
            setPlaidInfo={setPlaidInfo}
            settingsData={settingsData}
            onInit={this.onInit}
            folioCheckData={folioCheckData}
            checkFolioStatus={checkFolioStatus}
            isShowCompanySymbols={this.state.isShowCompanySymbols}
            isShowFirmName={this.state.isShowFirmName}
            isShowOrganization={this.state.isShowOrganization}
            isShowFamily={this.state.isShowFamily}
            isShowExperienceSector={this.state.isShowExperienceSector}
            isShowEmployment={this.state.isShowEmployment}
            submitSignature={submitSignature}
            folioSignatureData={folioSignatureData}
            cleanFolioStatus={cleanFolioStatus}
            fullAddress={this.fullAddress}
            locationChangeHandler={this.props.locationChangeHandler}
            folioSignatureStatus={folioSignatureStatus}
            handleGetCurrentPortfolio={this.handleGetCurrentPortfolio}
          />
        )
  }

}

PortfolioCreateContainer.propTypes = {
  //actions
  getQuestions: PropTypes.func.isRequired,
  setAnswers: PropTypes.func.isRequired,
  setPortfolio: PropTypes.func.isRequired,
  getPortfolio: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  registration: PropTypes.func.isRequired,
  setPlaidInfo: PropTypes.func.isRequired,
  getOnboarding: PropTypes.func.isRequired,

  //data
  portfolio: PropTypes.object,
  user: PropTypes.object,
  dataStatus: PropTypes.object,
  questionsData: PropTypes.object,
  questionsDataStatus: PropTypes.object,
  portfolioDataStatus: PropTypes.object,
  settingsData: PropTypes.object,
  onboardingData: PropTypes.object,
  onboardingDataStatus: PropTypes.object,
};

const mapStateToProps = ({
                           onboarding: {onboardingData, onboardingDataStatus},
                           onboardingQuestion: {questionsData, questionsDataStatus},
                           onboardingPortfolio,
                           userProfile: {data, dataStatus},
                           settings: {settingsData},
                           onboardingInvest,
                           // traiderStatus: {traiderStatusData, traiderStatusDataStatus},
                           folioReducer,
                         }) => ({
  portfolio: onboardingPortfolio.questionsData,
  portfolioDataStatus: onboardingPortfolio.questionsDataStatus,
  showPlaid: onboardingPortfolio.show_plaid,
  setPortfolioDataStatus: onboardingPortfolio.setPortfolioDataStatus,
  user: data,
  dataStatus,
  questionsData: questionsData,
  // questionsData: selectQuestions(questionsData),
  questionsDataStatus,
  settingsData: settingsData || {},
  onboardingData,
  onboardingDataStatus,
  onboardingInvestData: onboardingInvest.onboardingInvestData,
  onboardingInvestDataStatus: onboardingInvest.onboardingInvestDataStatus,
  setInvestDataStatus: onboardingInvest.setInvestDataStatus,
  // traiderStatus: traiderStatusData,
  // traiderStatusDataStatus,
  folioSignatureData: folioReducer.folioSignatureData,
  folioSignatureStatus: folioReducer.folioSignatureStatus,
  folioCheckData: folioReducer.checkData,
  folioCheckDataStatus: folioReducer.checkDataStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserProfile: getUserProfile.request,
  registration: registration.request,
  getQuestions: getQuestions.request,
  setAnswers: setAnswers.request,
  getPortfolio: getPortfolio.request,
  setPortfolio: setPortfolio.request,
  setPlaidInfo: setPlaidInfo.request,
  getSettings: getSettings.request,
  getOnboarding: getOnboarding.request,
  getOnboardingInvest: getOnboardingInvest.request,
  setOnboardingInvest: setOnboardingInvest.request,
  checkFolioStatus: checkFolioStatus.request,
  submitSignature: setFolioSignature.request,
  cleanFolioStatus: cleanFolioStatus.request,
  getCurrentPortfolio: getCurrentPortfolio.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withHandlers(PortfolioCreateContainer));
