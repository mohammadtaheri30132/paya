import React from 'react';
import ROW from "./shared/ROW";
import {scale} from "react-native-size-matters";
import TitleText from "./shared/TitleText";
import {InfoIcon} from "./shared/Icons";
import SubText from "./shared/SubText";
import {FlatList} from "react-native";

const EventList = ({list=[{id:22},{id:23},{id:12},{id:2435},{id:3242}]}) => {
    return (
        <FlatList
            renderItem={({item, index}) => {
                return (
                    <ROW w={'100%'}>
                        <ROW bg={'#f4f4f4'}  p={scale(5)} ph={scale(10)} w='100%'  >
                            <TitleText bold={false} style={{color:'rgb(15,68,109)'}}>9:20AM</TitleText>
                        </ROW>
                        <ROW p={scale(10)} pb={scale(20)} justifycenter row mr={'auto'}>
                            <ROW  mh={scale(10)} w={'100%'}>
                                <ROW row justifybetween aligncenter >
                                    <ROW row aligncenter>
                                        <TitleText bold={true} style={{color:'#009024',marginRight:scale(5)}}>Dana Hill Tennis Center</TitleText>
                                        <InfoIcon/>
                                    </ROW>
                                    <SubText title=''/>
                                    <TitleText  bold={false} >price:15$</TitleText>
                                </ROW>
                                <ROW row justifybetween aligncenter >
                                    <TitleText style={{marginVertical:scale(5)}} bold={false} >Adult Intermidiat</TitleText>
                                    <TitleText  bold={false} >10 spot left</TitleText>
                                </ROW>
                                <ROW row justifybetween aligncenter >
                                    <SubText title='Aliso Viejo - 90 min'/>
                                    <SubText light={false} style={{color:'#8d0005',textDecorationLine: "underline",}} title='Cancel'/>
                                </ROW>
                            </ROW>
                        </ROW>
                    </ROW>
                );
            }}
            data={list}
            style={{width: '100%'}}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={
                () => <ROW w='100%' h={1} bg={'#cecece'}  mr='auto' ml={'auto'} ></ROW>
            }
            ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
            contentContainerStyle={{}}
        />
    );
};

export default EventList;
