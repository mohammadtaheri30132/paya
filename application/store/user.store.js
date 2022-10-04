import React from 'react';
import { makeObservable, action, observable } from 'mobx';

class CounterStore {

    isCoche = false;

    constructor() {
        makeObservable(this, {
            isCoche: observable,
            changeIsCoche: action.bound,

        })
    }
    changeIsCoche() {
        this.isCoche =!this.isCoche;
    }
}

// Instantiate the counter store.
const userStore = new CounterStore();
export default userStore;
