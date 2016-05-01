import { PropTypes } from 'react';
import ContextProvider from './ContextProvider';

export function initContextProvider(types) {
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
