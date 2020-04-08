import React from 'react';
import { withRouter } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import PropTypes from "prop-types";
import {Alert} from './components/common';

class App extends React.Component {

  render() {
    //https://development.plaid.com/link/client/get
    // fetch('https://sandbox.plaid.com', { method: 'POST' })
    //     .then(res => res.json()) // expecting a json response
    //     .then(json => console.log(json));
    return (
      <div>
        {this.props.children}
        <Alert />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(connect(null)(App));
