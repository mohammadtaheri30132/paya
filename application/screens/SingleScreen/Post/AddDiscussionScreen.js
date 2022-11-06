import React, { useState } from 'react';
import {ActivityIndicator, Image, Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity} from "react-native";
import {AddCommentIcon, BackIcon, LikeIocn} from "../../../components/shared/Icons";
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import Br from "../../../components/shared/Br";
import TitleText from "../../../components/shared/TitleText";
import MoreText from "../../../components/shared/MoreText";
import SubText from "../../../components/shared/SubText";
import FastImage from 'react-native-fast-image'
import CustomButton from "../../../components/shared/CustomButton";
import {useNavigation} from "@react-navigation/native";

import userStore from '../../../store/user.store'
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { createDiscussion } from '../../../services/Api/Discussion';

const AddDiscussionScreen = () => {
    const navigation = useNavigation()
    const {isLoading,mutateAsync,error} = useMutation((data)=>createDiscussion(data))
    const queryClient = useQueryClient();
    const [text,setText] = useState("");
    const submitDiscussion = () =>{
        mutateAsync({body:text,geometry:{"coordinates": [ -117.7075526, 33.5225261 ]},participants:[]}).then(res=>{
            queryClient.invalidateQueries(['discussions']);
            navigation.goBack();
        })
    }

    
    return (
        <SafeAreaView>
        <ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[2]}
                    style={{width: '100%', backgroundColor: '#fff'}}>
            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft: scale(10)}}>Add Discussion</TitleText>
                        </ROW>
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
                                           source={{uri: userStore.user.profileImage}}/>
                                <ROW ml={scale(5)}>
                                    <TitleText bold={true}>{userStore.user.fullName}</TitleText>
                                    {/* <MoreText size={scale(12)} title='2 day ago'/> */}

                                </ROW>

                            </ROW>
                        </ROW>
                        {/* <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                            <SubText light={false}
                                     title='Priver Clase Lorem Epseilum text text and Clase Lorem Epseilum text text and ? '/>
                        </ROW> */}
                    </ROW>
                </ROW>
                <ROW row justifyend mt={scale(5)} mb={scale(5)} ph={scale(5)}>
                    {/* <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        borderRadius: 6,
                        padding: scale(4)
                    }}>

                        <ROW row ml={scale(5)} aligncenter>
                            <LikeIocn/>
                            <TitleText style={{marginLeft: scale(4)}} bold={false}>42</TitleText>
                        </ROW>

                    </TouchableOpacity> */}
                </ROW>
                <ROW p={scale(5)}>
                    <TextInput
                        multiline={true}
                        numberOfLines={20}
                        onChangeText={setText}
                        value={text}
                        placeholderTextColor='#002a32'
                        placeholder='write your question ...'
                        style={{
                            textAlignVertical: 'top',
                            color: '#002a32',
                            lineHeight:Platform.OS == "android"?1.3:30,
                            padding: scale(20),
                            fontFamily: 'CircularSpotifyText-Medium',
                            backgroundColor: '#f8f8f8',
                            borderRadius: 10,
                            minHeight:100

                        }}
                    />
                    <CustomButton onPress={()=>submitDiscussion()} title={isLoading?<ActivityIndicator size={'small'} color={'white'} />:'Submit'} style={{paddingVertical: scale(10), marginTop: scale(10)}}/>
                </ROW>


            </ROW>

        </ScrollView>
        </SafeAreaView>
    );
};


export default AddDiscussionScreen;
