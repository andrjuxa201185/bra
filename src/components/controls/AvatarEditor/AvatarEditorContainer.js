import React, {useRef, useState} from "react";
import AvatarEditor from 'react-avatar-editor';
import PropTypes from "prop-types";
import {Button, InputSlider} from '../';
import styles from './AvatarEditorStyles.scss';

const AvatarEditorContainer = ({url, onSave}) => {
  const editor = useRef(null);
  let [scale, setScale] = useState(1);

  const polifilToBlob = () => {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          let canvas = this;
          setTimeout(function () {
            let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
              len = binStr.length,
              arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], {type: type || 'image/png'}));
          });
        },
      });
    }
  };

  const handleSave = () => {
    polifilToBlob();
    if (editor) {
      editor.current.getImageScaledToCanvas().toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        onSave(blob, url);
        URL.revokeObjectURL(url);
      }, 'image/png');
    }
  };

  return (
    <div className={styles.container}>
      <AvatarEditor
        ref={editor}
        image={url}
        width={250}
        height={250}
        border={50}
        scale={scale}
        rotate={0}
        borderRadius={200}
      />
      <div className='mb-5 mt-4'>
        <InputSlider
          defaultValue={scale}
          min={0.5}
          max={2}
          step={0.1}
          onChange={value => setScale(value)}
        />
      </div>
      <Button onClick={handleSave} title='Save' size='md'/>
    </div>
  );
};

AvatarEditorContainer.propTypes = {
  url: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default AvatarEditorContainer;
