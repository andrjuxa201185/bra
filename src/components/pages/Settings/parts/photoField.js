import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../../common';
import { AvatarEditor } from '../../../controls';

const PhotoField = ({styles, value, name, onSave}) => {
  let [isEdit, setIsEdit] = useState(false);
  let [val, setValue] = useState(value);
  let [newImage, setNewImage] = useState(null);
  const input = useRef(null);

  const handleCancel = () => {
    setIsEdit(false);
    input.current.value = null;
  };

  const handleSave = (blob, url) => {
    setValue(url);
    handleCancel();
    onSave(blob);
  };

  const loadPhoto = e => {
    const fReader = new FileReader();
    fReader.readAsDataURL(e.target.files[0]);
    fReader.onloadend = event => {
      setNewImage(event.target.result);
      setIsEdit(true);
    };
  };
  return (
    <>
      <div className={styles.field}>
        <div className={styles.field__info}>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-between align-items-center flex-grow-1'>
              <div className={styles.field__name}>{name}</div>
              <div className={styles.field__photo} style={{backgroundImage: `url(${val})`}} />
            </div>
            <label className={styles.field__edit}>
              Edit
              <input
                ref={input}
                type='file'
                onChange={loadPhoto}
              />
            </label>
          </div>
        </div>
      </div>
      <Modal
        title='Edit your avatar'
        isOpen={isEdit}
        closeModal={handleCancel}
      >
        <AvatarEditor url={newImage} onSave={handleSave}/>
      </Modal>
    </>
  );
};

PhotoField.propTypes = {
  styles: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PhotoField;
