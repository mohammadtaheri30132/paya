import React from 'react';
import ROW from "../../../components/shared/ROW";
import {FlatList, Image, ScrollView, TouchableOpacity} from "react-native";
import {scale} from "react-native-size-matters";
import TitleText from "../../../components/shared/TitleText";
import MoreText from "../../../components/shared/MoreText";
import SubText from "../../../components/shared/SubText";
import {CancleCircle, Messages, SendMsg, TickCircle} from "../../../components/shared/Icons";
import FastImage from 'react-native-fast-image'
import Layout from "../../../components/shared/Layout";

const RequestTab = () => {
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
                                    <ROW mt={scale(12)} ml={scale(10)} w={'80%'}>
                                        <ROW row justifybetween aligncenter>
                                            <TitleText bold={true}>Mohammad Taheri</TitleText>
                                            <MoreText  size={scale(10)} title='2020/12/12 8:20'/>
                                        </ROW>
                                        <ROW row aligncenter={true} mt={scale(2)} >
                                            <MoreText title='Signed up for '/>
                                            <SubText light={false}  title='Priver Clase'/>
                                        </ROW>
                                    </ROW>


                                </ROW>
                                <ROW  w='100%'  row aligncenter mb={scale(5)} ph={scale(5)} mv={scale(15)} >

                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginRight:'auto',backgroundColor:'#b0b0b0',borderRadius:6,padding:scale(4)}}>

                                        <ROW >
                                            <SendMsg  color='#fff'/>
                                        </ROW>

                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginHorizontal:scale(5),backgroundColor:'#a90e20',borderRadius:6,padding:scale(3)}}>
                                        <ROW>
                                            <CancleCircle color='#fff'/>
                                        </ROW>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#0ea960',borderRadius:6,padding:scale(3)}}>

                                        <ROW>
                                            <TickCircle color='#fff'/>
                                        </ROW>
                                    </TouchableOpacity>

                                </ROW>
                            </ROW>
                        );
                    }}
                    data={List}
                    style={{width: '100%'}}
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={
                        () =>   <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'} mv={10}></ROW>
                    }
                    ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                    contentContainerStyle={{}}
                />
            </ScrollView>
        </Layout>
    );
};

export default RequestTab;
