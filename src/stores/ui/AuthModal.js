import { observable } from 'mobx';
import { action } from '~/src/state/actions';
import _ from 'lodash';

export default class AuthModal {

  @observable isOpen = true;

  @observable showSection = 'signin';

  @observable credentials = {
    username: '',
    password: '',
  };

  constructor(auth) {
    Object.assign(this, auth);
  }

  @action
  toggle(flag = null) {
    if (!flag) this.isOpen = !this.isOpen;
    if (flag === 'open') this.isOpen = true;
    if (flag === 'close') this.isOpen = false;
  }

  @action
  section(to = 'signin') {
    if (!to) this.showSection = 'signin';
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }

  @action
  updateFields(formValue) {
    _.merge(this.credentials, formValue);
  }
}
