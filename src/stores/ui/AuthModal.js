import { observable } from 'mobx';
import { action } from '~/src/state/actions';

export default class AuthModal {

  @observable showSection = 'signin';

  constructor(auth) {
    Object.assign(this, auth);
  }

  @action
  section(to = 'signin') {
    if (!to) this.showSection = 'signin';
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }
}
