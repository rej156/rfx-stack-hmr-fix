import { observable, computed } from 'mobx';
import { action } from 'local-reflex-react';
import { app, service } from '../app';
import _ from 'lodash';

export default class AuthStore {

  jwt = null;

  @observable user = null;

  constructor(auth) {
    Object.assign(this, auth);

    // get token from localStorage
    const token = global.CLIENT
      ? window.localStorage.token
      : null;

    // auto-login with jwt
    if (token) this.jwtAuth({ token });
  }

  updateUser(user) {
    this.user = user;
  }

  jwtAuth({ token }) {
    return app()
      .authenticate({ type: 'token', token })
      .then((result) => this.updateUser(result.data));
  }

  @action
  @computed
  get check() {
    return !_.isEmpty(this.user);
  }

  @action
  login({ email, password }) {
    return app()
      .authenticate({ type: 'local', email, password })
      .then((result) => this.updateUser(result.data));
  }

  @action
  register({ email, password, username }) {
    return service('user').create({ email, password, username });
  }

  @action
  logout() {
    app().logout().then(() => this.updateUser({}));
  }
}
