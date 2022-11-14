import React from 'react';
import {makeObservable, action, observable, computed} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CounterStore {

    googlePlacesApiKey = 'AIzaSyBTl2hQB_YKIYPeWLD2qJ0G08yTo7SErP8';

    centerMap =  [-84.371112, 33.937217];
    userLocation = [-84.371112, 33.937217];

    events = [];

    coaches = [];

    courts = [];

    isCoche = false;

    user = [];

    chatUser = [];

    chatInput = "";
    chatEditInput = "";

    editChatState = false;

    editedChatMessage = [];

    activeChatEmoji = [];

    showChatEmoji = false;


    constructor() {
        makeObservable(this, {
            centerMap: observable,
            userLocation: observable,
            isCoche: observable,
            showChatEmoji: observable,
            chatInput: observable,
            chatEditInput: observable,
            editChatState: observable,
            editedChatMessage: observable,
            activeChatEmoji: observable,
            setActiveChatEmoji: action,
            setShowChatEmoji: action,
            changeIsCoche: action.bound,
            events: observable,
            coaches: observable,
            courts: observable,
            setCenterMap: action,
            setUserLocation: action,
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
            setEditChatInput: action,
            
            endEditChat: action,
            startEditChat: action,
            setEditedChatMessage: action,
            coordinates: computed,

        })
    }
    setUserLocation(coord){
        this.userLocation = coord;
        console.log(this.userLocation)
    }
    setCenterMap(coord){
        this.centerMap = coord;
        console.log(this.centerMap)
    }

    setShowChatEmoji(state){
        this.showChatEmoji = state;
    }

    setActiveChatEmoji(item,evt) {
        let x = 0;
        
            x = evt.nativeEvent.pageY-30
        
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

    setEditChatInput(text) {
        this.editChatInput = text
    }

    editChat(item) {

        this.setEditedChatMessage(item)
        this.setChatInput(item.body)
        this.setEditChatInput(item.body)
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

    get coordinates(){
        return this.courts.map(x=>[x.id,x.address.longitude,x.address.latitude]);
    }

    changeIsCoche() {
        this.isCoche = !this.isCoche;
    }


}

// Instantiate the counter store.
const userStore = new CounterStore();
export default userStore;
