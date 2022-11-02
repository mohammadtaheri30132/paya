import React from 'react';
import {Image, ScrollView, TextInput, TouchableOpacity} from "react-native";
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

const AddCommentsScreen = () => {
    const navigation = useNavigation()
    return (
        <ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[2]}
                    style={{width: '100%', backgroundColor: '#fff'}}>
            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft: scale(10)}}>Add Comment</TitleText>
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
                                           source={{uri: 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                                <ROW ml={scale(5)}>
                                    <TitleText bold={true}>Mohammad Taheri</TitleText>
                                    <MoreText size={scale(12)} title='2 day ago'/>

                                </ROW>

                            </ROW>
                        </ROW>
                        <ROW row aligncenter={true} mt={scale(5)} mb={scale(10)}>

                            <SubText light={false}
                                     title='Priver Clase Lorem Epseilum text text and Clase Lorem Epseilum text text and ? '/>
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
                            <LikeIocn/>
                            <TitleText style={{marginLeft: scale(4)}} bold={false}>42</TitleText>
                        </ROW>

                    </TouchableOpacity>
                </ROW>
                <ROW p={scale(5)}>
                    <TextInput
                        multiline={true}
                        numberOfLines={20}
                        // onChangeText={(text) => this.setState({text})}
                        // value={this.state.text}
                        placeholderTextColor='#002a32'
                        placeholder='comment ...'
                        style={{
                            textAlignVertical: 'top',
                            color: '#002a32',
                            lineHeight: 1.3,
                            padding: scale(12),
                            fontFamily: 'CircularSpotifyText-Medium',
                            backgroundColor: '#f8f8f8',
                            borderRadius: 10,

                        }}
                    />
                    <CustomButton title='Submit' style={{paddingVertical: scale(10), marginTop: scale(10)}}/>
                </ROW>


            </ROW>

        </ScrollView>
    );
};


export default AddCommentsScreen;
