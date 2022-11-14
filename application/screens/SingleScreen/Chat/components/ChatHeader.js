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
                            <BackIcon color={'#0283fe'}/>
                        </TouchableOpacity>
                        <FastImage style={styles.profile}
                                   source={{uri: user.profileImage}}/>
                        <TitleText style={{marginLeft: scale(10)}}>{user.firstName+" "+user.lastName}</TitleText>
                    </ROW>
                </ROW>
            </ROW>
            
        </>
    );
};

export default ChatHeader;

const styles = StyleSheet.create({

    profile: {
        overflow: 'hidden',
        marginLeft:5,
        borderWidth:0.2,
        borderColor:'#858585',
        width: scale(35),
        height: scale(35),
        borderRadius: 100
    }
});
