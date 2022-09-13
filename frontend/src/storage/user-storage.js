import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this.isAuth = false;
    this.user = {};
    this.users = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setUsers(users) {
    this.users = users;
  }

  get isAuth() {
    return this.isAuth;
  }

  get user() {
    return this.user;
  }

  get users() {
    return this.users;
  }
}
