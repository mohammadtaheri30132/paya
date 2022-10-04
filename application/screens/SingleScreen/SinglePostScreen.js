import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {scale} from "react-native-size-matters";
import {AddCommentIcon, BackIcon, LikeIocn} from "../../components/shared/Icons";
import ROW from "../../components/shared/ROW";
import Br from "../../components/shared/Br";
import TitleText from "../../components/shared/TitleText";
import MoreText from "../../components/shared/MoreText";
import SubText from "../../components/shared/SubText";
import {useNavigation} from "@react-navigation/native";
import FastImage from 'react-native-fast-image'

const SinglePostScreen = () => {
    const List = [{id: 12131}, {id: 213}, {id: 3324}, {id: 223413}, {id: 223413}, {id: 324}, {id: 2}]
    const navigation = useNavigation()
    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('AddCommentsScreen')} style={styles.addCommentBtn}>
                <AddCommentIcon/>
            </TouchableOpacity>

            <ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[2]}
                        style={{width: '100%', backgroundColor: '#fff'}}>

                <ROW>
                    <ROW ph={scale(10)} pv={scale(5)}>
                        <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding: scale(5)}}>
                            <BackIcon/>
                        </TouchableOpacity>
                    </ROW>
                    <Br/>
                </ROW>

                <ROW w={'100%'} bg='white' p={scale(10)}>
                    <ROW justifycenter row mr={'auto'}>
                        <ROW mt={scale(12)} mh={scale(10)} w={'100%'}>

                            <ROW row justifybetween aligncenter>
                                <ROW row aligncenter>
                                    <FastImage style={{
                                        overflow: 'hidden',
                                        borderWidth: 5,
                                        borderColor: '#f8f8f8',
                                        width: scale(50),
                                        height: scale(50),
                                        borderRadius: 100
                                    }}
                                               source={{uri: 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                                    <ROW ml={scale(5)}>
                                        <TitleText bold={true}>Mohammad Taheri</TitleText>
                                        <MoreText size={scale(12)} title='2 day ago'/>

                                    </ROW>

                                </ROW>
                            </ROW>
                            <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                                <SubText light={false}
                                         title='Priver Clase Lorem Epseilum text text and Clase Lorem Epseilum text text and ? '/>
                            </ROW>
                        </ROW>
                    </ROW>
                    <ROW row justifyend mt={scale(5)} mb={scale(5)} ph={scale(5)}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                            borderRadius: 6,
                            padding: scale(4)
                        }}>

                            <ROW row ml={scale(5)} aligncenter>
                                <LikeIocn/>
                                <TitleText style={{marginLeft: scale(4)}} bold={false}>42</TitleText>
                            </ROW>

                        </TouchableOpacity>

                    </ROW>
                </ROW>


                <ROW bg={'#f4f4f4'} p={scale(5)} ph={scale(10)} w='100%'>
                    <TitleText bold={false} style={{color: 'rgb(15,68,109)'}}>Comments (23)</TitleText>
                </ROW>

                <FlatList
                    renderItem={({item, index}) => {
                        return (
                            <ROW w={'100%'} bg='white' p={scale(10)}>
                                <ROW justifycenter row mr={'auto'}>
                                    <ROW mt={scale(12)} mh={scale(10)} w={'100%'}>

                                        <ROW row justifybetween aligncenter>
                                            <ROW row aligncenter>
                                                <FastImage style={{
                                                    overflow: 'hidden',
                                                    borderWidth: 5,
                                                    borderColor: '#f8f8f8',
                                                    width: scale(50),
                                                    height: scale(50),
                                                    borderRadius: 100
                                                }}
                                                           source={{uri: index%2===0?'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg':'http://dev.villanovaice.com/wp-content/uploads/2015/02/Elon-Musk-300x300.jpg'}}/>
                                                <ROW ml={scale(5)}>
                                                    <TitleText bold={true}>Mohammad Taheri</TitleText>
                                                    <MoreText size={scale(12)} title='2020/12/12 8:20'/>
                                                </ROW>
                                            </ROW>
                                        </ROW>
                                        <ROW row aligncenter={true} ml={scale(55)} mb={scale(10)}>

                                            <SubText light={false}
                                                     title='Priver Clase Lorem Epseilum text text and Clase Lorem Epseilum text text and ? '/>
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
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={
                        () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'}></ROW>
                    }
                    ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                    contentContainerStyle={{}}
                />

            </ScrollView>
        </>
    );
};

export default SinglePostScreen;

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#0ea960',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        right: scale(20),
        bottom: scale(40),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },


});
