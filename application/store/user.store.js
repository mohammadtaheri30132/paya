import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CounterStore {

    events = [];

    coaches = [];

    courts = [];

    isCoche = false;

    user = [];

    chatUser = [];

    chatInput = "";

    editChatState = false;

    editedChatMessage = [];

    activeChatEmoji = [];

    showChatEmoji = false;


    constructor() {
        makeObservable(this, {
            isCoche: observable,
            showChatEmoji: observable,
            chatInput: observable,
            editChatState: observable,
            editedChatMessage: observable,
            activeChatEmoji: observable,
            setActiveChatEmoji: action,
            setShowChatEmoji: action,
            changeIsCoche: action.bound,
            events: observable,
            coaches: observable,
            courts: observable,
            setEvents: action,
            setCoaches: action,
            setCourts: action,
            user: observable,
            setUser: action,
            getUser: action,
            setChatUser: action,
            getChatUser: action,
            chatUser: observable,
            editChat: action,
            setChatInput: action,
            endEditChat: action,
            startEditChat: action,
            setEditedChatMessage: action,

        })
    }

    setShowChatEmoji(state){
        this.showChatEmoji = state;
    }

    setActiveChatEmoji(item,evt) {
        let x = 0;
        
            x = evt.nativeEvent.pageY-15
        
        this.activeChatEmoji[0] = item;
        this.activeChatEmoji[1] = x
    }

    setEditedChatMessage(item) {
        this.editedChatMessage = item;
    }

    startEditChat() {
        this.editChatState = true;
    }

    endEditChat() {
        this.editChatState = false;
        this.chatInput = "";
    }

    setChatInput(text) {
        this.chatInput = text
    }

    editChat(item) {

        this.setEditedChatMessage(item)
        this.setChatInput(item.body)
        this.startEditChat()
    }

    getChatUser(id, uid) {
        return this.chatUser[id].find(x => x.id === uid);
    }

    setChatUser(id, user) {
        this.chatUser[id] = user;
    }

    setUser(user) {
        this.user = user;
    }

    async getUser() {
        const user = await AsyncStorage.getItem('user');
        const x = JSON.parse(user);
        this.setUser(x);
    }

    setEvents(events) {
        this.events = events;
    }

    setCoaches(coaches) {
        this.coaches = coaches;
    }

    setCourts(courts) {
        this.courts = courts;
    }

    changeIsCoche() {
        this.isCoche = !this.isCoche;
    }


}

// Instantiate the counter store.
const userStore = new CounterStore();
export default userStore;
