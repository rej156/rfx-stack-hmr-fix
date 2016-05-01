import { PropTypes } from 'react';
import ContextProvider from './ContextProvider';

class ContextManager {
  types = null;

  provider = null;

  init(types) {
    this.setContextTypes(types);
    this.setContextProvider();
    return this.provider;
  }

  initContextProvider(types) {
    Object.assign(ContextProvider, { childContextTypes: types });
    Object.assign(ContextProvider.propTypes, {
      context: PropTypes.shape(types),
    });
    Object.assign(ContextProvider.prototype, {
      getChildContext() {
        return this.props.context;
      },
    });
    return ContextProvider;
  }

  setContextTypes(types) {
    this.types = types;
    return this;
  }

  getContextTypes() {
    return this.types;
  }

  setContextProvider() {
    this.provider = this.initContextProvider(this.types);
    return this;
  }

  getContextProvider() {
    return this.provider;
  }
}

export const contextManager = new ContextManager;
