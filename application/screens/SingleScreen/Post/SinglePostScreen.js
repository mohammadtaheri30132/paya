import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {scale} from "react-native-size-matters";
import {AddCommentIcon, BackIcon, LikeIocn} from "../../../components/shared/Icons";
import ROW from "../../../components/shared/ROW";
import Br from "../../../components/shared/Br";
import TitleText from "../../../components/shared/TitleText";
import MoreText from "../../../components/shared/MoreText";
import SubText from "../../../components/shared/SubText";
import {useNavigation} from "@react-navigation/native";
import FastImage from 'react-native-fast-image'
import {getDiscussionById, getDiscussionComment, reactComment, reactDiscussion} from '../../../services/Api/Discussion';
import ErrorInternet from '../../../components/shared/ErrorInternet';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import userStore from '../../../store/user.store';
import ChatEmoji from '../Chat/components/ChatEmoji';
import {observer} from 'mobx-react-lite';
import {FadeLoading} from "react-native-fade-loading";

const SinglePostScreen = ({route}) => {
    const sender = route.params.sender
    const id = route.params.id

    const queryClient = useQueryClient();

    const {isLoading: isLoadingD, data, error: errorD} = useQuery(['discussions', id], () => getDiscussionById(id))


    //const List = [{id: 12131}, {id: 213}, {id: 3324}, {id: 223413}, {id: 223413}, {id: 324}, {id: 2}]

    const [userInfo, setUserInfo] = useState([]);

    const {
        isLoading: isLoadingL,
        mutateAsync: likeDiscussionFn,
        error: errorL
    } = useMutation(() => reactDiscussion({id: id, code: 232}),)

    const {isLoading: isLoadingR, mutateAsync: reactCommentFn, error: errorR} = useMutation(({
                                                                                                 id,
                                                                                                 code
                                                                                             }) => reactComment({
        id,
        code
    }),)

    const {isLoading, data: List, error} = useQuery(['comments', id], () => getDiscussionComment(id), {
        onSuccess: (data) => {
            //console.log("Get data!");
            console.log(data?.data?.config?.userInfo); // undefined
            setUserInfo(data?.data?.config?.userInfo);
        }
    })

    const getUserInfo = useCallback((id) => {
        return userInfo.find(x => x.id === id);
    }, [userInfo]);

    const likeDiscussion = () => {
        likeDiscussionFn().then(res => {
            queryClient.resetQueries(['discussions', id])
        })
    }

    const setReact = useCallback(async ({cid, code}) => {
        const res = await reactCommentFn({id: cid, code});
        if (res.status === 200) {
            userStore.setShowChatEmoji(false)
            queryClient.resetQueries(['comments', id])
        }
    }, [])


    const emojies = [
        {id: 1, code: 11, icon: '😍'},
        {id: 2, code: 12, icon: '👍'},
        {id: 3, code: 13, icon: '😂'},
        {id: 4, code: 14, icon: '😔'},
        {id: 5, code: 15, icon: '😡'},
        {id: 6, code: 16, icon: '❤️'},
    ];


    const navigation = useNavigation()

    //if (isLoadingD) return <LoadingScreen />
    if (errorD) return <ErrorInternet/>

    //if (isLoadingL) return <LoadingScreen />
    if (errorL) return <ErrorInternet/>

    //if (isLoading) return <LoadingScreen />
    if (error) return <ErrorInternet/>


    return (
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddCommentsScreen', {
                    data: id,
                    info: data.data ,
                    sender
                })}
                style={styles.addCommentBtn}>
                <AddCommentIcon/>
            </TouchableOpacity>

            <ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[0]}
                        style={{width: '100%', backgroundColor: '#fff'}}>

                <ROW>
                    <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                            <ROW row aligncenter>
                                <BackIcon/>
                                <TitleText style={{marginLeft: scale(10)}}>Post</TitleText>

                            </ROW>
                        </TouchableOpacity>
                    </ROW>
                    <Br/>
                </ROW>
                {isLoadingD ?
                    <ROW p={scale(15)}>
                        <ActivityIndicator size={'small'} color={'black'}/>
                    </ROW>
                    :
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
                                                   source={{uri: sender.profileImage}}/>
                                        <ROW ml={scale(5)}>
                                            <TitleText
                                                bold={true}>{sender.firstName + " " + sender.lastName}</TitleText>

                                            <MoreText size={scale(12)}
                                                      title={moment(data?.data?.data.sentAt).fromNow()}/>

                                        </ROW>

                                    </ROW>
                                </ROW>
                                <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                                    <SubText light={false}
                                             color={'#002a32'}
                                             title={data?.data?.data.body}/>
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
                                    <Pressable onPress={likeDiscussion}>
                                        <LikeIocn/>
                                    </Pressable>
                                    {isLoadingL ? (
                                            <ActivityIndicator size={'small'} color={'black'}/>
                                        )
                                        :
                                        <TitleText style={{marginLeft: scale(4)}}
                                                   bold={false}>{data?.data?.data?.reactions?.length}</TitleText>
                                    }
                                </ROW>

                            </TouchableOpacity>

                        </ROW>
                    </ROW>
                }


                <ROW bg={'#f4f4f4'} p={scale(5)} ph={scale(10)} w='100%'>
                    <TitleText bold={false} style={{color: 'rgb(15,68,109)'}}>Comments
                        ({List?.data?.data?.length})</TitleText>
                </ROW>


                {isLoading ?
                    <ROW p={scale(15)}>
                        <ActivityIndicator size={'small'} color={'black'}/>
                    </ROW>
                    :
                    <FlatList
                        renderItem={({item, index}) => {
                            const user = getUserInfo(item.sender)
                            return (
                                <TouchableOpacity onPress={(evt) => {
                                    userStore.setActiveChatEmoji(item, evt)
                                    userStore.setShowChatEmoji(true)
                                }}>
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
                                                                   source={{uri: user?.profileImage}}/>
                                                        <ROW ml={scale(5)}>
                                                            {user ? (
                                                                <TitleText
                                                                    bold={true}>{user?.firstName + " " + user?.lastName}</TitleText>
                                                            ) : (
                                                                <FadeLoading primaryColor="#ababab"
                                                                             secondaryColor="#e5e5e5" duration={2500}/>
                                                            )}
                                                            <MoreText size={scale(12)}
                                                                      title={moment(item.sentAt).format('Y/M/D H:m:s')}/>
                                                            <ROW row mt={5} mb={5}>{item.reactions.map(it => <Text
                                                                style={{marginRight: 0}}>{emojies.find(x => x.code === it.reactId).icon}</Text>)}</ROW>
                                                        </ROW>
                                                    </ROW>
                                                </ROW>
                                                <ROW row aligncenter={true} style={{
                                                    backgroundColor: '#ededed',
                                                    borderBottomRightRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    borderBottomLeftRadius: 10
                                                }} p={scale(10)} ml={scale(55)} mb={scale(10)}>
                                                    {user ? (
                                                        <SubText light={false}
                                                                 color={'#002a32'}
                                                                 title={item?.body}/>

                                                    ) : (
                                                        <ROW w='80%'>
                                                            <FadeLoading primaryColor="#ababab" secondaryColor="#e5e5e5"
                                                                         duration={2500}/>
                                                        </ROW>

                                                    )}


                                                </ROW>

                                            </ROW>
                                        </ROW>
                                    </ROW>
                                </TouchableOpacity>
                            );
                        }}
                        data={List?.data?.data}
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
                }


            </ScrollView>
            {userStore.showChatEmoji &&
                <>
                    <Pressable onPress={() => userStore.setShowChatEmoji(false)} style={{
                        // backgroundColor: 'rgba(0,0,0,.5)',
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        width: '100%',
                        height: Dimensions.get('window').height,
                        zIndex: 1
                    }}></Pressable>
                    <View style={{
                        position: 'absolute',
                        top: userStore.activeChatEmoji[1] - 100,
                        zIndex: 2,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ChatEmoji emojies={emojies} setReact={setReact}/>
                    </View>
                </>
            }
        </SafeAreaView>
    );
};

export default observer(SinglePostScreen);

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#002a32',
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
