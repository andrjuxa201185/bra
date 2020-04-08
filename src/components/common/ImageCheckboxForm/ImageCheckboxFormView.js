import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageCheckboxFormStyles.scss';

class ImageCheckboxFormView extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      data,
      onInputChange,
    } = this.props;

    const dataList = Object.keys(data).map(key => data[key]);

    return (
      <div className={styles.checkboxForm}>
        <form action=''>
          <div className={styles.checkboxForm__content}>
            {dataList.map(item => (
              <div className={styles.checkboxForm__wrapperItem} key={item.id}>
                <label className={styles.checkboxForm__item} >
                  <input
                    type='checkbox'
                    name={item.id}
                    checked={item.checked}
                    onChange={onInputChange}/>
                  <div className={styles.checkMark}>
                    <img src={item.image} className={styles.checkboxForm__img} alt=''/>
                  </div>
                  <span className={styles.checkboxForm__name}>{item.name}</span>
                </label>
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}

export default ImageCheckboxFormView;
