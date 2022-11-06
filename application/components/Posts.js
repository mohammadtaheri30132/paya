import React from 'react';
import ROW from "./shared/ROW";
import { scale } from "react-native-size-matters";
import {ActivityIndicator, FlatList, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import TitleText from "./shared/TitleText";
import MoreText from "./shared/MoreText";
import SubText from "./shared/SubText";
import { CommentIcon, LikeIocn } from "./shared/Icons";
import { useNavigation } from "@react-navigation/native";
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import { getDiscussion, reactDiscussion } from '../services/Api/Discussion';
import { useMutation, useQueryClient } from 'react-query';
import ErrorInternet from './shared/ErrorInternet';
import LoadingScreen from './shared/LoadingScreen';
const Posts = ({ list = [], getUserInfo }) => {

    const { isLoading: isLoadingL, mutateAsync: likeDiscussionFn, error: errorL } = useMutation((id) => reactDiscussion({ id: id, code: 232 }),)

    const queryClient = useQueryClient();

    const likeDiscussion = (id) => {
        likeDiscussionFn(id).then(res => {
            queryClient.invalidateQueries('discussions')
        })
    }
    const navigation = useNavigation()
    // if (isLoadingL) return <LoadingScreen />
     if (errorL) return <ErrorInternet />

    return (
       <>
           {isLoadingL &&(
               <ROW style={styles.loading}>
                   <ActivityIndicator size={'small'} color={'#fff'}/>
               </ROW>
           )}
           <FlatList
               renderItem={({ item, index }) => {
                   const user = getUserInfo(item.sender)
                   //console.log('user:',user,item)
                   return (
                       <TouchableOpacity onPress={() => navigation.navigate('SinglePost', { id: item._id, sender: user })}>
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
                                                          source={{ uri: user?.profileImage }} />
                                               <ROW ml={scale(5)}>
                                                   {
                                                       <TitleText bold={true}>{user?.firstName + " " + user?.lastName}</TitleText>

                                                   }
                                                   <MoreText size={scale(12)} title={moment(item.sentAt).fromNow()} />

                                               </ROW>

                                           </ROW>
                                       </ROW>
                                       <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                                           <SubText light={false} title={item.body} />
                                       </ROW>
                                   </ROW>
                               </ROW>
                               <ROW row justifyend mt={scale(5)} mb={scale(5)} ph={scale(5)} >
                                   <ROW row aligncenter>
                                       <CommentIcon />
                                       <TitleText style={{ marginLeft: scale(4) }} bold={false} >{item?.commentCount}</TitleText>
                                   </ROW>
                                   <TouchableOpacity onPress={()=>likeDiscussion(item._id)}
                                   style={{
                                       flexDirection: 'row',
                                       alignItems: 'center',

                                       borderRadius: 6,
                                       padding: scale(4)
                                   }}>

                                       <ROW row ml={scale(5)} aligncenter>
                                               <LikeIocn />


                                           <TitleText style={{ marginLeft: scale(4) }} bold={false}>{item?.reactions?.length}</TitleText>

                                       </ROW>

                                   </TouchableOpacity>

                               </ROW>
                           </ROW>
                       </TouchableOpacity>
                   );
               }}
               data={list}
               style={{ width: '100%' }}
               keyExtractor={(item, index) => index}
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               ItemSeparatorComponent={
                   () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'} ></ROW>
               }
               ListFooterComponent={() => <ROW h={scale(120)}></ROW>}
               contentContainerStyle={{}}
           />
       </>
    );
};

export default Posts;

const styles = StyleSheet.create({
    loading: {
        borderRadius: 20,
        zIndex: 99999999999,
        position: 'absolute',
        backgroundColor: '#002a32',
        top: scale(70),
        alignSelf: 'center',
        width: scale(30),
        height: scale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
})
