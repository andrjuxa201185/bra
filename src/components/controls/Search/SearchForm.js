import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import styles from './SearchFormStyles.scss';
import PropTypes from 'prop-types';

const prepareText = (query, text) => {
  const searchIndex = text.toLowerCase().indexOf(query.toLowerCase());
  const startIndex = searchIndex === -1 ? 0 : searchIndex;
  const startQueryText = text.slice(startIndex);
  return startQueryText.length >= 40 ? startQueryText.slice(0, 39) : startQueryText;

};

const escapeHTML = str => {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

class SearchForm extends PureComponent {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string,
    autocompleteData: PropTypes.array,
    path: PropTypes.string.isRequired,
  };

  handleInputChange = e => {
    this.props.onSearch(e.target.value);
  };

  render() {
    const { autocompleteData, searchValue, path } = this.props;
    const showAutocomplete = autocompleteData.length && searchValue.length > 2;
    return (
      <div className={styles.container}>
        <div className={styles.search}>
          <form className={styles.input__wrapper}>
            <input
              type='text'
              className={styles.input}
              placeholder={'search'}
              value={searchValue}
              onChange={this.handleInputChange}
            />
            <button className={styles.input__search}/>
          </form>
          { showAutocomplete ? <div className={styles.autocomplete}>
            {autocompleteData.map(item => {
              return (
                <Link to={`${path}/${item.id}`} className={styles.autocomplete__item} key={item.id}>
                  <span className={styles.autocomplete__title}>{prepareText(searchValue, item.name)}...</span>
                  <span className={styles.autocomplete__text}>...{prepareText(searchValue, escapeHTML(item.publication || item.text))}...</span>
                </Link>);
            })}
          </div> : null}
        </div>
      </div>
    );
  }
}

export default SearchForm;
