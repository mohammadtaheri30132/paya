import React from 'react';
import ROW from "./shared/ROW";
import {scale} from "react-native-size-matters";
import {FlatList,  TouchableOpacity} from "react-native";
import TitleText from "./shared/TitleText";
import MoreText from "./shared/MoreText";
import SubText from "./shared/SubText";
import {CommentIcon, LikeIocn} from "./shared/Icons";
import {useNavigation} from "@react-navigation/native";
import FastImage from 'react-native-fast-image'
const Posts = ({list=[]}) => {
   const navigation= useNavigation()
    return (
        <FlatList
            renderItem={({item, index}) => {
                return (
                    <TouchableOpacity onPress={()=>navigation.navigate('SinglePost')}>
                        <ROW w={'100%'} p={scale(10)}>
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
                                                <TitleText  bold={true}>Mohammad Taheri</TitleText>
                                                <MoreText   size={scale(12)} title='2 day ago'/>

                                            </ROW>

                                        </ROW>
                                    </ROW>
                                    <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                                        <SubText light={false} title='Priver Clase Lorem Epseilum text text and Clase Lorem Epseilum text text and ? '/>
                                    </ROW>
                                </ROW>
                            </ROW>
                            <ROW  row justifyend  mt={scale(5)}   mb={scale(5)} ph={scale(5)} >


                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    // backgroundColor: '#b0b0b0',

                                    borderRadius: 6,
                                    padding: scale(4)
                                }}>

                                    <ROW row aligncenter>
                                        <CommentIcon/>
                                        <TitleText style={{marginLeft:scale(4)}} bold={false} >12</TitleText>
                                    </ROW>

                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    borderRadius: 6,
                                    padding: scale(4)
                                }}>

                                    <ROW row ml={scale(5)} aligncenter>
                                        <LikeIocn/>
                                        <TitleText style={{marginLeft:scale(4)}} bold={false} >42</TitleText>
                                    </ROW>

                                </TouchableOpacity>

                            </ROW>
                        </ROW>
                    </TouchableOpacity>
                );
            }}
            data={list}
            style={{width: '100%'}}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={
                () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'} ></ROW>
            }
            ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
            contentContainerStyle={{}}
        />
    );
};

export default Posts;
