import React from 'react';
import {TouchableOpacity, View} from "react-native";
import ROW from "../components/shared/ROW";
import TitleText from "../components/shared/TitleText";
import stor from './../store/user.store'
import {useNavigation} from "@react-navigation/native";
import {scale} from "react-native-size-matters";

const Setting = () => {
    const navigation = useNavigation()
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ROW>
                <TouchableOpacity onPress={() => stor.changeIsCoche()}>
                    <TitleText>go to coach screen </TitleText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <TitleText>go to login moin </TitleText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login2')}>
                    <TitleText>go to login ali </TitleText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => stor.changeIsCoche()}>
                    <TitleText>go to user screen</TitleText>
                </TouchableOpacity>
            </ROW>
        </View>
    );
};

export default Setting;
