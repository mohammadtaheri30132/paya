import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {scale} from "react-native-size-matters";
import Br from "../../../../components/shared/Br";
import ROW from "../../../../components/shared/ROW";
import {CancleCircle, CommentIcon, Send} from "../../../../components/shared/Icons";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {createMessage, getChatMessages, updateMessage} from "../../../../services/Api/Chat";
import LoadingScreen from "../../../../components/shared/LoadingScreen";
import ErrorInternet from "../../../../components/shared/ErrorInternet";
import userStore from '../../../../store/user.store';
import {observer} from 'mobx-react-lite';

const ChatFooter = ({chatId,style}) => {
    const queryClient = useQueryClient();
    const [body, setBody] = useState('')
    console.log('chat id')
    console.log(chatId)
    const {isLoading, mutateAsync} = useMutation(() => createMessage({chatId, body: userStore.chatInput}),)
    const {
        isLoading: isLoadingU,
        mutateAsync: updateBody,
        error: errorU
    } = useMutation(() => updateMessage({mId: userStore.editedChatMessage._id, body: userStore.chatInput}),)
    //if (isLoading) return <LoadingScreen/>
    

    //if (isLoadingU) return <LoadingScreen/>
    //if (errorU) return <ErrorInternet/>

    const sendMessage = () => {
        if (userStore.editChatState) {
            updateBody().then(res => {
                queryClient.invalidateQueries(['chats', chatId])
                userStore.endEditChat()
            })
        } else {
            mutateAsync().then(res => {
                queryClient.invalidateQueries(['chats', chatId])
                userStore.setChatInput("")
            })
        }

    }
    
    return (

        <View style={{...style}}>
            {userStore.editChatState &&
                <ROW row aligncenter justifybetween w={'100%'}>
                    <ROW ml={10}><CommentIcon/></ROW>
                    <View style={styles.editbox}>
                        <Text style={{color: '#df2c14'}}>Edit Message</Text>
                        
                        <Text style={{color: '#858585'}}>{userStore.editChatInput}</Text>
                    </View>
                    <TouchableOpacity onPress={() => userStore.endEditChat()} style={styles.cancel}>
                        <CancleCircle/>
                    </TouchableOpacity>
                </ROW>
            }
            
            <ROW row aligncenter justifybetween w={'100%'} pv={scale(3)}>
                <View style={styles.footer}>
                    <TextInput
                        placeholder='Message ...'
                        multiline={true}
                        
                        value={userStore.chatInput}
                        onChangeText={(e) => userStore.setChatInput(e)}
                        placeholderTextColor={'#002a32'}
                        style={[styles.textInput,Platform.OS == "ios"?{lineHeight:25}:{}]}/>

                </View>
                <TouchableOpacity onPress={sendMessage} style={styles.send}>
                    {isLoading || isLoadingU?<LoadingScreen/>:<Send/>}
                </TouchableOpacity>
            </ROW>

        </View>);
};

export default observer(ChatFooter)

const styles = StyleSheet.create({
    send: {
        padding: scale(21),
        
        marginHorizontal: scale(10),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(20),
        backgroundColor: '#0283fe',
        height: scale(20)
    },
    cancel: {
        padding: scale(12),
        marginRight: scale(7),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(20),
        height: scale(20)
    },
    textInput: {
        paddingVertical: scale(10),
        width: '100%',
        backgroundColor: '#f1f1f8',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: scale(20),
        color: '#002a32',
        borderRadius: 25,
    },
    footer: {
        backgroundColor: "transparent",
        height: scale(40),
        flex: 1,
        marginLeft: scale(10),
        marginBottom:scale(2)
    },
    editbox: {
        padding: 10,
        justifyContent: 'center',

        height: scale(50),
        width: '75%'
    }
});
