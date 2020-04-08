import React from 'react';
import styles from "./ListStyles.scss";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ListView = ({ data, path }) => (
  <ul className={styles.list}>
    {
      data && data.map(item => (
        <li className={styles.listItem} key={item.id}>
          <Link to={`${path}/${item.id}`} className={styles.listItemLink}>{item.name}</Link>
        </li>
      ))
    }
  </ul>
);

ListView.propTypes = {
  data: PropTypes.array.isRequired,
  path: PropTypes.string,
};

export default ListView;
