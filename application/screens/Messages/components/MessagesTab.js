import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet} from "react-native";
import {scale} from "react-native-size-matters";
import ROW from "../../../components/shared/ROW";
import TitleText from "../../../components/shared/TitleText";
import SubText from "../../../components/shared/SubText";
import MoreText from "../../../components/shared/MoreText";
import FastImage from 'react-native-fast-image'
import Layout from "../../../components/shared/Layout";

const MessagesTab = () => {
    const List = [{id: 12131}, {id: 213}, {id: 3324}, {id: 223413},{id: 223413}, {id: 324}, {id: 2}]
    return (
        <Layout>
            <ScrollView nestedScrollEnabled={true} style={{width: '100%', backgroundColor: '#fff'}}>
                <FlatList
                    renderItem={({item, index}) => {
                        return (
                            <ROW w={'100%'} p={scale(10)} >
                                <ROW justifycenter row mr={'auto'}>
                                    <FastImage style={{
                                        overflow: 'hidden',
                                        borderWidth: 5,
                                        borderColor: '#f8f8f8',
                                        width: scale(50),
                                        height: scale(50),
                                        borderRadius: 100
                                    }}
                                               source={{uri: index%2===0?'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg':'http://dev.villanovaice.com/wp-content/uploads/2015/02/Elon-Musk-300x300.jpg'}}/>
                                    <ROW mt={scale(12)} ml={scale(10)} w={'70%'}>
                                        <TitleText bold={true}>Mohammad Taheri</TitleText>
                                        <ROW mt={scale(2)}>
                                            <MoreText title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur'/>
                                            <MoreText  title='19 JUN'/>
                                        </ROW>
                                    </ROW>

                                </ROW>

                            </ROW>
                        );
                    }}
                    data={List}
                    style={{width: '100%'}}
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={
                        () =>   <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'} mv={10}></ROW>
                    }
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                    contentContainerStyle={{}}
                />
            </ScrollView>
        </Layout>
    );
};

export default MessagesTab;
const styles = StyleSheet.create({
    border:{
        borderBottomWidth:1,
        borderColor:'#e3e3e3'
    }
});
