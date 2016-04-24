import { observable } from 'mobx';
import { action } from '~/src/state/actions';
import _ from 'lodash';

export default class AuthModal {

  @observable isOpen = true;

  @observable showSection = 'signin';

  @observable signinErrors = null;

  @observable signupErrors = null;

  @observable signinModel = {
    email: '',
    password: '',
  };

  @observable signupModel = {
    email: '',
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
  toggleSection(to = 'signin') {
    if (!to) this.showSection = 'signin';
    if (to === 'signin') this.showSection = 'signin';
    if (to === 'signup') this.showSection = 'signup';
  }

  @action
  updateFields(formValue) {
    _.merge(this.signinModel, formValue);
  }

  @action
  setSigninErrors(data) {
    console.log('setSigninErrors', data);
    this.signinErrors = data;
  }

  @action
  setSignupErrors(data) {
    this.signupErrors = data;
  }

  @action
  getCredentials(type = null) {
    if (type === 'signin') return this.signinModel;
    if (type === 'signup') return this.signupModel;
    return null;
  }
}
