import React, { Component, PropTypes } from 'react';

const contextTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
  cache: PropTypes.object,
  router: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  muiTheme: PropTypes.object,
};

export default class ContextProvider extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object, // ???
    context: React.PropTypes.shape(contextTypes),
  };

  static childContextTypes = contextTypes;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props && this.props.children;
  }
}
