import SubText from "../../../../components/shared/SubText";
import {scale} from "react-native-size-matters";
import ROW from "../../../../components/shared/ROW";
import {Dimensions, Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import userStore from "../../../../store/user.store";


const ChatEmoji = ({emojies,setReact}) =>{
    return (<ROW row bg={'#002a32'} style={{borderBottomLeftRadius:0}} br={10} p={5}>
        {emojies.map(item2=><Pressable onPress={()=>setReact({cid:userStore.activeChatEmoji[0]._id,code:item2.code})}><Text style={styles.emojiitem}>{item2.icon}</Text></Pressable>)}
    </ROW>)
}
export default ChatEmoji;

const styles = StyleSheet.create({
    emojiitem:{
        fontSize:scale(20),
        color:'#fff',
        marginHorizontal:scale(2),

    }
})
