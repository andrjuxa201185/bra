import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '../../../controls';
import * as validator from "../../../../helpers/validator";

const Field = ({styles, value, onSave, name, title, validate}) => {
  let [isEdit, setIsEdit] = useState(false);
  let [val, setValue] = useState(value);
  let [errors, setErrors] = useState({});

  const onCancel = () => {
    setValue(value);
    setIsEdit(false);
  };


  const handleChangeValue = (val, name) => {
    if (name === 'firstName' || name === 'lastName') {
      const rFullName = /[^a-zA-Z\s]/g;
      const value = val.replace(rFullName, "");
      setValue(value);
    } else {
      setValue(val);
    }
  };

  const handleSave = () => {
    const {errors} = validator.validate(validate, {[name]: val});
    setErrors(errors);
    if (!Object.keys(errors).length) {
      setIsEdit(false);
      //setValue(value);
      onSave({[name]: val});
    }
  };

  return (
    <>
      <div className={styles.field}>
        <div className={styles.field__info}>
          <div className='d-flex justify-content-between align-items-cente'>
            <div className='d-flex justify-content-between align-items-center flex-grow-1'>
              <div className={styles.field__name}>{title}</div>
              {!isEdit ?
                <div className={styles.field__val}>{value}</div> : null
              }
            </div>
            {!isEdit ?
              <button onClick={() => setIsEdit(true)} className={styles.field__edit}>Edit</button> : null
            }
          </div>
        </div>
      </div>
      {isEdit ?
        <div className={styles.edit}>
          <div className={styles.edit__box}>
            <Input
              value={val}
              onChange={e => handleChangeValue(e.target.value, name)}
              error={errors[name]}
            />
            <div className='row mt-3'>
              <div className='col'>
                <Button size='md' title='Save' onClick={handleSave}/>
              </div>
              <div className='col'>
                <Button
                  size='md'
                  title='Cancel'
                  transparent
                  onClick={onCancel}
                />
              </div>
            </div>
          </div>
        </div>: null}
    </>
  );
};

Field.propTypes = {
  styles: PropTypes.object.isRequired,
  validate: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Field;
