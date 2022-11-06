import React from 'react';
import ROW from "../../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import {StyleSheet, TouchableOpacity} from "react-native";
import {BackIcon} from "../../../../components/shared/Icons";
import FastImage from "react-native-fast-image";
import TitleText from "../../../../components/shared/TitleText";
import Br from "../../../../components/shared/Br";
import {useNavigation} from "@react-navigation/native";

const ChatHeader = ({user}) => {
    const navigation = useNavigation()

    return (
        <>
            <ROW  ph={scale(10)} pv={scale(5)} bg='#fff'>
                <ROW>
                    <ROW row aligncenter>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                            <BackIcon/>
                        </TouchableOpacity>
                        <FastImage style={styles.profile}
                                   source={{uri: user.profileImage}}/>
                        <TitleText style={{marginLeft: scale(10)}}>{user.firstName+" "+user.lastName}</TitleText>
                    </ROW>
                </ROW>
            </ROW>
            <Br/>
        </>
    );
};

export default ChatHeader;

const styles = StyleSheet.create({

    profile: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#fff',
        width: scale(40),
        height: scale(40),
        borderRadius: 100
    }
});
