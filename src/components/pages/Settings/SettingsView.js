import React from 'react';
import { Tabs, TabPanel } from 'react-tabs';
import { TabNav, Tab } from '../../controls';
import styles from './SettingsStyles.scss';
import SettingsPersonalInfo from './tabs/personalInfo';
import SettingsLifestyleProfile from './tabs/lifestyleProfile';
import SettingsCloseAccount from './tabs/closeAccount';
import BankAccount from "./tabs/bankAccount";
import {DOMAIN_LANDING_URL} from "../../../service/apiConstants";

const tabList = [
  'Personal info',
  'Lifestyle Profile',
  'Statements & Tax Documentation',
  'Bank Account',
  'Close Account',
  'Legal',
];

const SettingsView = () => {

  return (
    <>
      <Tabs>
        <div className='topPanel'>
          <div className='contentContainer'>
            <h1>Settings</h1>
            <TabNav>
              {tabList.map((tab, i) => (
                <Tab key={i}>{tab}</Tab>
              ))}
            </TabNav>
          </div>
        </div>
        <div className='mainContent'>
          <div className='contentContainer'>
            <TabPanel>
              <SettingsPersonalInfo styles={styles} />
            </TabPanel>
            <TabPanel>
              <SettingsLifestyleProfile styles={styles} />
            </TabPanel>
            <TabPanel>
              <div className='stub'>
                <div className='stub__text'>
                  Available After Investing.
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <BankAccount />
            </TabPanel>
            <TabPanel>
              {/*<SettingsCloseAccount styles={styles} />*/}
              <div className='stub__text'>
                Сurrently the section is over development.
              </div>
            </TabPanel>
            <TabPanel>
              <ul className={styles.list}>
                <li className={styles.listItem}><a href={`${DOMAIN_LANDING_URL}/privacy-policy.php`}>Privacy Policy</a></li>
                <li className={styles.listItem}><a href={`${DOMAIN_LANDING_URL}/terms-of-use.php`}>Terms of Use</a></li>
                <li className={styles.listItem}><a href={`${DOMAIN_LANDING_URL}/disclosures.php`}>Disclosures</a></li>
              </ul>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </>
  );
};

SettingsView.propTypes = {};

export default SettingsView;
