import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this.isAuth = false;
    this.currentUser = {};
    this.users = [];
    makeAutoObservable(this);
  }

  setIsAuth(isAuth) {
    this.isAuth = isAuth;
  }

  getIsAuth() {
    return this.isAuth;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }
}
