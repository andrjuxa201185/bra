import React from 'react';
import PropTypes from "prop-types";
import styles from "./GoToWorldViewStyles.scss";
import { Button } from "../../controls";
import { WORLD_VIEW } from "../../../navigation/routes";
import { globals } from "../../../store/globals";

const GoToWorldView = ({text}) => {
  const navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };
  return (
    <div className='panel'>
      <div className={styles.directionBlock}>
        <div className={styles.directionBlock__info}>
          <h3 className={styles.directionBlock__title}>Complete World View</h3>
          <p className={styles.directionBlock__text}>
            {text}
          </p>
        </div>
        <div className={styles.directionBlock__buttonContainer}>
          <Button
            onClick={navTo(WORLD_VIEW)}
            title={'Go to World View'}
            size={'md'}
          />
        </div>
      </div>
    </div>
  );
};

GoToWorldView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default GoToWorldView;
