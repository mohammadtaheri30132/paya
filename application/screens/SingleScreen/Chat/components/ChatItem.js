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

    //0ea960
    if (item.sender === userStore.user.userId) {
        return (
            <TouchableOpacity onPress={(evt) => {
                userStore.setActiveChatEmoji(item, evt)
                userStore.setShowChatEmoji(true)
            }}>
                <ROW mb={scale(10)} mh={scale(10)}>
                    <ROW row style={{alignSelf: 'flex-start'}}>
                        <FastImage style={{
                            overflow: 'hidden',
                            borderWidth: 5,
                            borderColor: '#f8f8f8',
                            width: scale(50),
                            height: scale(50),
                            borderRadius: 100
                        }}
                                   source={{uri: user.profileImage}}/>
                        <Pressable onPress={(evt) => {
                            userStore.setActiveChatEmoji(item, evt)
                            userStore.setShowChatEmoji(true)
                        }} onLongPress={() => userStore.editChat(item)} style={{alignSelf: 'flex-end'}}>
                            <ROW ph={scale(20)} bg={'#0ea960'} style={{borderBottomLeftRadius: 0}}
                                 br={20} pv={scale(10)}>
                                <SubText title={item.body} color='#fff'/>
                            </ROW>
                        </Pressable>

                    </ROW>

                    <ROW mt={5} row style={{alignSelf: 'flex-start'}}>
                        <SubText title={chatTime} size={scale(10)}/>
                        <ROW ml={5} row>{item.reactions.map(it => <Text
                            style={{marginLeft: 0}}>{emojies.find(x => x.code === it.reactId).icon}</Text>)}</ROW>
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


            <ROW mb={scale(10)}  mh={scale(10)}>


                    <ROW row style={{alignSelf: 'flex-end',}}>
                        <ROW ph={scale(20)} bg={'rgba(0,42,50,1)'}
                             style={{alignSelf: 'flex-end', borderBottomRightRadius: 0,}}
                             br={20} pv={scale(10)}>
                            <SubText title={item.body} color='#fff'/>
                        </ROW>
                        <FastImage style={{
                            overflow: 'hidden',
                            borderWidth: 5,
                            borderColor: '#f8f8f8',
                            width: scale(50),
                            height: scale(50),
                            borderRadius: 100,


                        }}
                                   source={{uri: user.profileImage}}/>
                    </ROW>

                    <ROW mt={5} style={{alignSelf: 'flex-end', flexDirection: 'row-reverse',}}>
                        <SubText title={chatTime} size={scale(10)}/>
                        <ROW row mr={5}>{item.reactions.map(it => <Text
                            style={{marginRight: 0}}>{emojies.find(x => x.code === it.reactId).icon}</Text>)}</ROW>
                    </ROW>

            </ROW>


        </TouchableOpacity>

    )
};

export default observer(ChatItem);


