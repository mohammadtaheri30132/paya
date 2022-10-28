import React, { useState } from 'react';
import {ActivityIndicator, Image, Pressable, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { BackIcon, LikeIocn} from "../../components/shared/Icons";
import ROW from "../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import Br from "../../components/shared/Br";
import TitleText from "../../components/shared/TitleText";
import FastImage from 'react-native-fast-image'
import CustomButton from "../../components/shared/CustomButton";
import { createComment } from '../../services/Api/Discussion';
import { useMutation, useQueryClient } from 'react-query';
import ErrorInternet from '../../components/shared/ErrorInternet';
import { SafeAreaView } from 'react-native-safe-area-context';
import userStore from '../../store/user.store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubText from "../../components/shared/SubText";

const AddCommentsScreen = ({route,navigation}) => {
    const data = route.params.data
    const info = route.params.info
    const sender = route.params.sender
    const [commentInput,setCommentInput] = useState("");
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync, error } = useMutation(() => createComment({ mId:data, body: commentInput }),)
    //if (isLoading) return <LoadingScreen />
    if (error) return <ErrorInternet />

    const submitComment = () =>{
        console.log(data._id)
        mutateAsync().then(res=>{
            queryClient.resetQueries(['comments',data]);
            navigation.goBack();

        })
    }


    return (<SafeAreaView style={{flex:1}}>
        <ScrollView>

            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft:scale(10)}}>Add Comment</TitleText>
                        </ROW>
                    </TouchableOpacity>
                </ROW>
                <Br/>
            </ROW>
            <ROW w={'100%'} bg='white' flex p={scale(10)}>
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
                                    <TitleText bold={true}>{sender.firstName+' ' +
                                        sender.lastName}</TitleText>

                                    <SubText light={false}
                                             color={'#002a32'}
                                             title={info?.data.body}/>
                                </ROW>

                            </ROW>
                        </ROW>
                    </ROW>
                </ROW>
                <ROW mt={scale(10)} p={scale(5)}>
                    <TextInput
                        multiline={true}
                        numberOfLines={20}
                        onChangeText={setCommentInput}
                        value={commentInput}
                        placeholderTextColor='#002a32'
                        placeholder='comment ...'
                        style={{
                            textAlignVertical: 'top',
                            color: '#002a32',
                            lineHeight: 1.3,
                            padding: scale(20),
                            fontFamily: 'CircularSpotifyText-Medium',
                            backgroundColor: '#f8f8f8',
                            borderRadius: 10,

                        }}
                    />


                    <CustomButton onPress={submitComment} title={isLoading?<ActivityIndicator size={'small'} color={'black'}/>:'Submit'} style={{paddingVertical: scale(10), marginTop: scale(10)}}/>

                </ROW>


            </ROW>

        </ScrollView>


        </SafeAreaView>
    );
};


export default AddCommentsScreen;
