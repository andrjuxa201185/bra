import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from './ModalStyles.scss';
import Button from "../../controls/Button/ButtonView";
import ModalView from './ModalView';
import {Input, Select, Textarea} from "../../controls";
import {globals} from "../../../store/globals";

class CreateTopicModal extends PureComponent {

  state = {
    categoryId: this.props.categoriesData.length ? this.props.categoriesData[0].id : null,
    nameTopic: '',
    text: '',
  };

  onCategoryChange = e => {
    this.setState({categoryId: +e.target.value});
  };

  onNameChange = e => {
    this.setState({nameTopic: e.target.value});
  };

  onTextChange = e => {
    this.setState({text: e.target.value});
  };

  handleCreate = e => {
    e.preventDefault();
    const { text } = this.state;
    const categoryId = this.props.articleId ? this.props.categoriesData[0] : this.state.categoryId;
    const nameTopic = this.props.nameTopic ? this.props.nameTopic : this.state.nameTopic;
    const libraryId = this.props.articleId ? this.props.articleId : null;

    this.props.createPost({categoryId, nameTopic, text, libraryId }, id => {
      console.log(libraryId);
      globals.history.push(`/discussion-board/comments/${id}`);
      this.props.hideTopicModal();
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.categoriesData.length !== this.props.categoriesData.length) {
      this.setState({
        categoryId: this.props.categoriesData[0].id,
      });
    }
  }

  render() {
    const {isOpen, title, hideTopicModal, articleId, categoriesData, error} = this.props;
    const { errors = {} } = error;
    return (
      <ModalView
        title={title}
        isOpen={isOpen}
        closeModal={hideTopicModal}
      >
        {!articleId && <div className='mb-4'>
          <Select
            label={'Category'}
            options={categoriesData}
            onSelect={this.onCategoryChange}
            categoryId={this.state.categoryId}/>
          </div>}
        {!articleId && <div className='mb-4'>
          <Input
            label={'Topic Name'}
            size={'md'}
            value={this.state.nameTopic}
            onChange={this.onNameChange}
            error={errors.name && errors.name[0]}/>
        </div>}
        <div className='mb-4'>
          <Textarea
            label={'Your Comments'}
            value={this.state.text}
            onChange={this.onTextChange}
            error={errors.text && errors.text[0]}
          />
        </div>
        <div className='d-flex justify-content-start'>
          <div className={styles.button}>
            <Button
              onClick={this.handleCreate}
              title={'Create'}
              size={'md'}
              transparent
            />
          </div>
        </div>
      </ModalView>
    );
  }
}

CreateTopicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideTopicModal: PropTypes.func.isRequired,
  articleId: PropTypes.number,
  categoriesData: PropTypes.array,
  categoryId: PropTypes.number,
  nameTopic: PropTypes.string,
  createPost: PropTypes.func.isRequired,
};

export default CreateTopicModal;
