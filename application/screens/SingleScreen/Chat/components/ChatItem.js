import moment from 'moment';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from "react-native-size-matters";
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ROW from "../../../../components/shared/ROW";
import SubText from "../../../../components/shared/SubText";
import userStore from '../../../../store/user.store';
import ChatEmoji from "./ChatEmoji";
import { observer } from "mobx-react-lite";

const EmojiesList = ({ reactions, emojies }) => {

    return reactions.map(it =>
        <Text
            style={{
                marginRight: 0,
                color: '#000'
            }}>{emojies.find(x => x.code === it.reactId).icon}</Text>

    )
}

const ChatItem = ({ item, index, emojies }) => {
    //const user = userStore.getChatUser(item.chatId, item.sender);
    const chatTime = moment(item.sentAt).format('H:mm')



    //0ea960
    if (parseInt(item.sender) !== parseInt(userStore.user.userId)) {
        return (

            <ROW mb={item.reactions.length > 0 ? scale(30) : scale(5)} mh={scale(10)}>
                <ROW row style={{ alignSelf: 'flex-start' }}>
                    <Pressable onPress={(evt) => {
                        userStore.setActiveChatEmoji(item, evt)
                        userStore.setShowChatEmoji(true)
                    }}  style={{ alignSelf: 'flex-end' }}>
                        <ROW ph={scale(20)} bg={'#f1f1f8'} style={{ borderBottomLeftRadius: 0 }}
                            br={20} pv={scale(10)}>
                            <SubText title={item.body} size={16} color='#000' />


                        </ROW>
                    </Pressable>
                </ROW>
                <ROW mt={5} style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row-reverse',
                    position: 'relative',
                    top: -scale(7)
                }}>
                    {item.reactions.length > 0 &&
                        <ROW bg={'#fff'} br={35} style={{ position: 'absolute', right: scale(5), bottom: -scale(29),shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        
                        elevation: 2, }} mr={scale(0)} p={scale(10)} row>
                            <EmojiesList reactions={item.reactions} emojies={emojies} />
                        </ROW>
                    }
                    {/* <SubText title={chatTime} size={scale(10)} color='#002a32' /> */}

                </ROW>
            </ROW>

        )
    }

    return (




        <ROW mb={item.reactions.length > 0 ? scale(30) : scale(5)} mh={scale(10)} >
            <ROW row style={{ alignSelf: 'flex-end' }} >
                <Pressable onPress={(evt) => {
                    userStore.setActiveChatEmoji(item, evt)
                    userStore.setShowChatEmoji(true)
                }} onLongPress={() => userStore.editChat(item)} >
                    <ROW ph={scale(20)} bg={'#0283fe'}
                        style={{ alignSelf: 'flex-start', borderBottomRightRadius: 0 }}
                        br={20} pv={scale(10)}>
                        <SubText title={item.body} size={16} color='#fff' />


                    </ROW>
                </Pressable>
            </ROW>
            <ROW mt={5} style={{
                alignSelf: 'flex-end',
                flexDirection: 'row-reverse',
                position: 'relative',
                top: -scale(7)
            }} pointerEvents="none">
                {/* <SubText title={chatTime} pointerEvents="none" size={scale(10)} color='#002a32' /> */}
                {item.reactions.length > 0 &&
                    <ROW bg={'#fff'} br={35} style={{ position:'absolute',left: scale(5), bottom: -scale(29),shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    
                    elevation: 2, }} mr={scale(0)} p={scale(10)} row>
                        <EmojiesList reactions={item.reactions} emojies={emojies} />
                    </ROW>
                }
            </ROW>

        </ROW>




    )
};

export default observer(ChatItem);


