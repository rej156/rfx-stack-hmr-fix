import faker from 'faker';
import { service } from '../app';

export function factory() {
  return {
    uuid: faker.random.uuid(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

export function userSeederDevelopment() {
  return service('user').create({
    uuid: faker.random.uuid(),
    email: 'admin@test.tld',
    username: 'admin',
    password: '12345',
  });
}

export function userSeederTesting() {
  return service('user').create(factory());
}
