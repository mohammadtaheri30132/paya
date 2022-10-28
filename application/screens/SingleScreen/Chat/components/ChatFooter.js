import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import Br from "../../../../components/shared/Br";
import ROW from "../../../../components/shared/ROW";
import { CancleCircle, CommentIcon, Send } from "../../../../components/shared/Icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createMessage, getChatMessages, updateMessage } from "../../../../services/Api/Chat";
import LoadingScreen from "../../../../components/shared/LoadingScreen";
import ErrorInternet from "../../../../components/shared/ErrorInternet";
import userStore from '../../../../store/user.store';
import { observer } from 'mobx-react-lite';

const ChatFooter = ({ chatId }) => {
    const queryClient = useQueryClient();
    const [body, setBody] = useState('')

    const { isLoading, mutateAsync, error } = useMutation(() => createMessage({ chatId, body: userStore.chatInput }),)
    const { isLoading:isLoadingU, mutateAsync:updateBody, error:errorU } = useMutation(() => updateMessage({ mId:userStore.editedChatMessage._id, body: userStore.chatInput }),)
    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorInternet />

    if (isLoadingU) return <LoadingScreen />
    if (errorU) return <ErrorInternet />

    const sendMessage = () => {
        if(userStore.editChatState){
            updateBody().then(res => {
                queryClient.refetchQueries(['chats', chatId])
                userStore.endEditChat()
            })
        }
        else{
            mutateAsync().then(res => {
                queryClient.refetchQueries(['chats', chatId])
                userStore.setChatInput("")
            })
        }

    }

    return (

        <>
            {userStore.editChatState &&
                <ROW row aligncenter bg={'#fff'} justifybetween w={'100%'}>
                    <ROW ml={10}><CommentIcon /></ROW>
                    <View style={styles.editbox}>
                        <Text style={{ color: '#df2c14' }}>Edit Message</Text>
                        <Text  style={{ color: '# ' }}>{userStore.chatInput}</Text>
                    </View>
                    <TouchableOpacity onPress={() => userStore.endEditChat()} style={styles.cancel}>
                        <CancleCircle />
                    </TouchableOpacity>
                </ROW>
            }
            <Br />
            <ROW row aligncenter justifybetween w={'100%'} bg={'#fff'} pv={scale(3)}>
                <View style={styles.footer}>
                    <TextInput
                        placeholder='Message ...'
                        multiline={true}
                        value={userStore.chatInput}
                        onChangeText={(e) => userStore.setChatInput(e)}
                        placeholderTextColor={'#002a32'}
                        style={styles.textInput} />

                </View>
                <TouchableOpacity onPress={sendMessage} style={styles.send}>
                    <Send />
                </TouchableOpacity>
            </ROW>

        </>);
};

export default observer(ChatFooter)

const styles = StyleSheet.create({
    send: {
        padding: scale(22),
        marginRight: scale(7),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(20),
        backgroundColor: '#002a32',
        height: scale(20)
    },
    cancel: {
        padding: scale(22),
        marginRight: scale(7),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(20),

        height: scale(20)
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        height: '100%',
        paddingHorizontal: scale(20),
        color: '#002a32',
    },
    footer: {
        backgroundColor:"#fff",
        height: scale(50),
        width: '83%'
    },
    editbox: {
        padding: 10,
        justifyContent:'center',

        height: scale(50),
        width: '75%'
    }
});