import { observable } from 'mobx';
import { action } from '../state/actions';
import { app, service } from '../app';
import _ from 'lodash';

export default class AuthStore {

  @observable user = {};

  constructor(auth) {
    Object.assign(this, auth);
  }

  updateUser(user) {
    this.user = user;
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
    .then((result) => this.updateUser(result.data))
    .then((result) => console.log('Authenticated!', result))
    .catch((error) => console.error('Error authenticating!', error));
  }

  @action
  register({ email, password }) {
    return service('user').create({ email, password });
  }

  @action
  logout() {
    app().logout().then(() => this.updateUser({}));
  }
}
