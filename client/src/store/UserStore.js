import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._users = [{}]
        this._currUser = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(users){
        this._users = users
    }
    setCurrUser(currUser){
        this._currUser = currUser
    }

    get isAuth(){
        return this._isAuth
    }
    get users(){
        return this._users
    }
    get currUser(){
        return this._currUser
    }
}