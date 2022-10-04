import React, {useState} from 'react';
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import TitleText from "../../../components/shared/TitleText";
import {Button, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {RemoveUser} from "../../../components/shared/Icons";
import SubText from "../../../components/shared/SubText";


const UserItem = ({setModalVisible}) => {

    return (
        <>


            <ROW w={'100%'} p={scale(10)}>
                <ROW justifycenter row mr={'auto'}>
                    <FastImage style={{
                        overflow: 'hidden',
                        borderWidth: 5,
                        borderColor: '#f8f8f8',
                        width: scale(50),
                        height: scale(50),
                        borderRadius: 100
                    }}
                               source={{uri: 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                    <ROW mt={scale(10)} ml={scale(10)} w={'80%'}>
                        <ROW row justifybetween aligncenter>
                            <TitleText bold={true}>Mohammad Taheri</TitleText>
                            <TouchableOpacity onPress={()=>setModalVisible(true)}
                                              style={{paddingHorizontal: scale(10), paddingVertical: scale(2)}}>
                                <RemoveUser/>
                            </TouchableOpacity>
                        </ROW>
                        <ROW row aligncenter={true}>
                            <SubText light={false} title='Advance 1'/>
                        </ROW>
                    </ROW>
                </ROW>
            </ROW>
        </>
    );
};

export default UserItem;
