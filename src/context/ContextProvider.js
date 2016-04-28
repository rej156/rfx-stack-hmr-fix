import React, { Component } from 'react';
import contextTypes from './types';

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
