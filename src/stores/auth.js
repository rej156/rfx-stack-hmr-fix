import { observable } from 'mobx';
import { action } from '../state/actions';
import { app, service } from '../app';
import _ from 'lodash';

export default class AuthStore {

  jwt = null;

  @observable user = null;

  constructor(auth) {
    Object.assign(this, auth);

    this.jwtAuth();
  }

  updateUser(user) {
    this.user = user;
  }

  jwtAuth() {
    return app().authenticate({
      type: 'token',
      token: global.CLIENT ? window.localStorage.token : null,
    })
    .then((result) => this.updateUser(result.data));
  }

  @action
  check() {
    return _.isEmpty(this.user);
  }

  @action
  login({ email, password }) {
    return app().authenticate({
      type: 'local',
      email,
      password,
    })
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
