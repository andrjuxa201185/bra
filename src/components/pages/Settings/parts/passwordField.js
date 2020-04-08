import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '../../../controls';
import * as validator from "../../../../helpers/validator";

const PasswordField = ({styles, onSave}) => {
  let [isEdit, setIsEdit] = useState(false);
  let [password, setPassword] = useState('');
  let [repeat, setRepeat] = useState('');
  let [errors, setErrors] = useState({});

  const validate = {
    required: ['password', 'repeat_password'],
    custom: [
      validator.samePasswords(['password', 'repeat_password']),
      validator.password(['password']),
    ],
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  const handleSave = () => {
    const {errors} = validator.validate(validate, {password, repeat_password: repeat});
    setErrors(errors);
    if (!Object.keys(errors).length) {
      setIsEdit(false);
      onSave({password});
    }
  };

  return (
    <>
      <div className={styles.field}>
        <div className={styles.field__info}>
          <div className='d-flex justify-content-between align-items-cente'>
            <div className='d-flex justify-content-between align-items-center flex-grow-1'>
              <div className={styles.field__name}>Password</div>
              {!isEdit ?
                <div className={styles.field__val}>***********</div> : null
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
            <div className='mb-3'>
              <Input
                type='password'
                onChange={e => setPassword(e.target.value)}
                placeholder='Your Password'
                error={errors['password']}
              />
            </div>
            <Input
              type='password'
              placeholder='Repeat Password'
              onChange={e => setRepeat(e.target.value)}
              error={errors['repeat_password']}
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

PasswordField.propTypes = {
  styles: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PasswordField;
