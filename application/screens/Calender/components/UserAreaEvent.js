import React from 'react';
import {  ScrollView} from "react-native";
import {scale} from "react-native-size-matters";
import ROW from "../../../components/shared/ROW";
import TitleText from "../../../components/shared/TitleText";
import SubText from "../../../components/shared/SubText";
import CustomButton from "../../../components/shared/CustomButton";
import Br from "../../../components/shared/Br";
import Posts from "../../../components/Posts";

const UserAreaEvent = () => {
    return (
        <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
            <ROW row justifybetween aligncenter p={scale(10)} >
                <ROW w='48%' aligncenter p={12} justifycenter bg={'#f8f8f8'} br={8}>
                        <TitleText  size={scale(11)} >Danahill Teniiis Center</TitleText>
                        <SubText size={scale(10)} title='Private - $6 per hour'/>
                    <CustomButton title='Reserve' style={{paddingVertical:scale(5),marginTop:scale(20),borderRadius:5}}/>
                </ROW>
                <ROW w='48%' aligncenter p={12} justifycenter bg={'#f8f8f8'} br={8}>
                    <TitleText  size={scale(11)} >Danahill Teniiis Center</TitleText>
                    <SubText size={scale(10)} title='Private - $6 per hour'/>
                    <CustomButton title='Reserve' style={{paddingVertical:scale(5),marginTop:scale(20),borderRadius:5}}/>
                </ROW>

            </ROW>
            <Br/>

            <Posts list={[{id:12},{id:14},{id:5461},{id:4561},{id:1234},]} />
        </ScrollView>
    );
};

export default UserAreaEvent;
