import moment from 'moment';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from "react-native-size-matters";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ROW from "../../../../components/shared/ROW";
import SubText from "../../../../components/shared/SubText";
import userStore from '../../../../store/user.store';
import ChatEmoji from "./ChatEmoji";
import {observer} from "mobx-react-lite";

const ChatItem = ({item, emojies}) => {
    const user = userStore.getChatUser(item.chatId, item.sender);
    const chatTime = moment(item.sentAt).format('H:mm')
    console.log('s')
    console.log(userStore.user.userId)
    console.log(item.sender)
    //0ea960
    if (parseInt(item.sender) === parseInt(userStore.user.userId)) {
        return (
            <TouchableOpacity onPress={(evt) => {
                userStore.setActiveChatEmoji(item, evt)
                userStore.setShowChatEmoji(true)
            }}>
                <ROW mb={scale(5)} mh={scale(10)}>
                    <ROW row style={{alignSelf: 'flex-start'}}>
                        <Pressable onPress={(evt) => {
                            userStore.setActiveChatEmoji(item, evt)
                            userStore.setShowChatEmoji(true)
                        }} onLongPress={() => userStore.editChat(item)} style={{alignSelf: 'flex-end'}}>
                            <ROW ph={scale(20)} bg={'#fff'} style={{borderBottomLeftRadius: 0}}
                                 br={20} pv={scale(10)}>
                                <SubText title={item.body} color='#002a32'/>
                                <ROW bg={'#f6f6f6'} br={10} style={{position:'absolute',right:scale(10),bottom:-scale(15)}} mr={scale(10)} ph={scale(10)} row>{item.reactions.map(it => <Text
                                    style={{
                                        marginRight: 0,
                                        color: '#fff'
                                    }}>{emojies.find(x => x.code === it.reactId).icon}</Text>)}</ROW>
                            </ROW>
                        </Pressable>
                    </ROW>
                    <ROW mt={5} style={{
                        alignSelf: 'flex-start',
                        flexDirection: 'row-reverse',
                        position: 'relative',
                        top: -scale(7)
                    }}>
                        <SubText title={chatTime} size={scale(10)} color='#002a32'/>

                    </ROW>
                </ROW>

            </TouchableOpacity>
        )
    }

    return (


        <TouchableOpacity onPress={(evt) => {
            
            userStore.setActiveChatEmoji(item, evt)
            userStore.setShowChatEmoji(true)
        }}>


            <ROW mb={scale(5)} mh={scale(10)} >
                <ROW row style={{alignSelf: 'flex-end'}} >
                    <ROW ph={scale(20)} bg={'rgba(2,234,152,0.76)'}
                         style={{alignSelf: 'flex-start', borderBottomRightRadius: 0}}
                         br={20} pv={scale(10)}>
                        <SubText title={item.body} color='#002a32'/>
                        <ROW bg={'rgba(0,169,104,0.76)'} br={10} style={{position:'absolute',left:scale(10),bottom:-scale(15)}} mr={scale(10)} ph={scale(10)} row>{item.reactions.map(it => <Text
                            style={{
                                marginRight: 0,
                                color: '#fff'
                            }}>{emojies.find(x => x.code === it.reactId).icon}</Text>)}</ROW>
                    </ROW>
                </ROW>
                <ROW mt={5} style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row-reverse',
                    position: 'relative',
                    top: -scale(7)
                }} pointerEvents="none">
                    <SubText title={chatTime} pointerEvents="none" size={scale(10)} color='#002a32'/>

                </ROW>

            </ROW>


        </TouchableOpacity>

    )
};

export default observer(ChatItem);


