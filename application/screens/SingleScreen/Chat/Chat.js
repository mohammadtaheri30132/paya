import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList, ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ROW from "../../../components/shared/ROW";
import { scale } from "react-native-size-matters";
import ChatFooter from "./components/ChatFooter";
import ChatItem from "./components/ChatItem";
import ChatHeader from "./components/ChatHeader";

import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAllUserChats, getChatMessages, reactMessage, updateMessage} from "../../../services/Api/Chat";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import ErrorInternet from "../../../components/shared/ErrorInternet";
import { SafeAreaView } from 'react-native-safe-area-context';
import userStore from '../../../store/user.store';
import ChatEmoji from "./components/ChatEmoji";
import {observer} from "mobx-react-lite";


const Chat = ({ route }) => {
    //const [userInfo, setUserInfo] = useState([]);
    const id = route.params.id
    const user = route.params.user

    const queryClient = useQueryClient();
    const [listChat,setListChat]=React.useState([])
    // const [updateLoading,setUpdateLoading]=React.useState(true)
    const { isLoading:isLoadingU, mutateAsync:updateReact, error:errorU } = useMutation((data) => reactMessage({ id:data.id,code:data.code} ),)
    const { isLoading, data: List, error,isSuccess } = useQuery(['chats', id], () => getChatMessages(id), {
        onSuccess: (data) => {
            //console.log("Get data!");
            setListChat(data?.data?.data)
            console.log('chats',data?.data?.data)
            console.log(data?.data?.config?.userInfo); // undefined
            userStore.setChatUser(id,data?.data?.config?.userInfo);
        }
    })

    const setReact = useCallback(async ({cid,code}) => {
        const res = await updateReact({id:cid,code});
        if(res.status === 200 ){
            userStore.setShowChatEmoji(false)
            queryClient.invalidateQueries(['chats',id])
        }
    },[])



    // if (isLoading) return <LoadingScreen />
    if (error) return <ErrorInternet />




    // if (isLoadingU) return <LoadingScreen />
    if (errorU) return <ErrorInternet />


    const emojies = [
        {id:1,code:11,icon:'😍'},
        {id:2,code:12,icon:'👍'},
        {id:3,code:13,icon:'😂'},
        {id:4,code:14,icon:'😔'},
        {id:5,code:15,icon:'😡'},
        {id:6,code:16,icon:'❤️'},
    ];



    /* [
     {id: 223241, text: 'ok!'},
         {id: 2335642, text: 'yes, but I need go home and take a shower then read book and and lop lop lop'},
         {id: 2343433, text: 'are ready?'},
         {id: 243, text: 'how are you?'},
         {id: 234455, text: 'hello'},
         {id: 22, text: 'hi'}
     ]*/
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                {isLoadingU || isLoading &&(
                    <ROW style={styles.loading}>
                        <ActivityIndicator size={'small'} color={'#fff'}/>
                    </ROW>
                )}
                {userStore.showChatEmoji &&
                    <>
                        <Pressable onPress={()=>userStore.setShowChatEmoji(false)} style={{
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            width: '100%',
                            height: Dimensions.get('window').height,
                            zIndex: 1
                        }}></Pressable>
                        <View style={{position: 'absolute', top: userStore.activeChatEmoji[1], zIndex: 2,width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <ChatEmoji emojies={emojies} setReact={setReact}/>
                        </View>
                    </>
                }
                <ChatHeader user={user} />
                <ImageBackground style={styles.image} source={require('./../../../assets/image/backchat.png')} >
                <FlatList
                    renderItem={({ item, index }) => (<ChatItem emojies={emojies} setReact={setReact} item={item} />)}
                    data={listChat}
                    style={styles.chat}
                    inverted
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 15 ,backgroundColor:'transparent'}}



                />
                    <ChatFooter chatId={id} />

                </ImageBackground>

            </SafeAreaView>
        </>
    );
};

export default observer(Chat);

const styles = StyleSheet.create({
    loading:{
        borderRadius:20,
        zIndex:99999999999,
        position:'absolute',
        backgroundColor: '#002a32',
        top:scale(70),
        alignSelf: 'center',
        width: scale(30),
        height: scale(30),
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width: '100%', flex:1, justifyContent: 'flex-end'
    },
    chat: {
        // paddingTop: scale(62)
        width: '100%',
        // , height: '50%',
        backgroundColor: 'transparent'
    }
});
