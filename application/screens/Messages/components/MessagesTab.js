import React, { useState } from 'react';
import {FlatList, Image, Pressable, ScrollView, StyleSheet} from "react-native";
import {scale} from "react-native-size-matters";
import ROW from "../../../components/shared/ROW";
import TitleText from "../../../components/shared/TitleText";
import SubText from "../../../components/shared/SubText";
import MoreText from "../../../components/shared/MoreText";
import FastImage from 'react-native-fast-image'
import Layout from "../../../components/shared/Layout";
import {useQuery} from "react-query";
import {profileApi} from "../../../services/Api/profile";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import ErrorInternet from "../../../components/shared/ErrorInternet";
import {getAllUserChats} from "../../../services/Api/Chat";
import {useNavigation} from "@react-navigation/native";
import moment from 'moment';

const MessagesTab = () => {

    const [userInfo,setUserInfo] = useState([]);
    const navigation = useNavigation()
    const {isLoading, data:List,error} = useQuery('chats',getAllUserChats, {
        onSuccess: (data) => {
          // console.log("Get data!");

          console.log(data?.data?.config?.userInfo); // undefined
          setUserInfo(data?.data?.config?.userInfo);
        }
      })
    if (isLoading) return <LoadingScreen/>
    if (error) return <ErrorInternet/>

    const getUserInfo = (id) => {
        return userInfo.find(x=>x.id === id);
    }
    console.log('List')
    console.log(List?.data?.data)
    console.log('List')
    return (
        <Layout bg={'#fff'}>
            <ScrollView nestedScrollEnabled={true} style={{width: '100%', backgroundColor: '#fff'}}>
                <FlatList
                    renderItem={({item, index}) => {
                        const user = getUserInfo(item.participants[0]);
                        return (
                            <Pressable onPress={()=>navigation.navigate('Chat',{id:item._id,user:user})}>
                            <ROW w={'100%'} p={scale(10)} >
                                <ROW justifycenter row mr={'auto'}>
                                    <FastImage style={styles.image}
                                               source={{uri: user.profileImage}}/>
                                    <ROW mt={scale(12)} ml={scale(10)} w={'70%'}>
                                        <TitleText bold={true}>{user.firstName+" "+user.lastName}</TitleText>
                                        <ROW mt={scale(2)}>
                                            {/* <MoreText title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur'/> */}
                                            <MoreText  title={moment(item.updatedAt).format('DD MMM')}/>
                                        </ROW>
                                    </ROW>

                                </ROW>

                            </ROW>
                            </Pressable>
                        );
                    }}
                    data={List?.data?.data}
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
    },
    image:{
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: '#f8f8f8',
        width: scale(50),
        height: scale(50),
        borderRadius: 100
    }
});
