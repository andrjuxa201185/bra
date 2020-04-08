import React from 'react';
import PropTypes from 'prop-types';
import ImageCheckboxFormView from './ImageCheckboxFormView';

class ImageCheckboxFormContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.number.isRequired,
    handleFormData: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    const { name, checked } = e.target;
    const { id } = this.props;
    const checkedItem = {[id]: {id: name, checked: checked}};

    this.props.handleFormData(checkedItem);
  };

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <ImageCheckboxFormView
        data={data}
        onInputChange={this.handleInputChange}/>
    );
  }
}

export default ImageCheckboxFormContainer;
