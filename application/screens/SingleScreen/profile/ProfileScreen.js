import React from 'react';
import {MaskedViewIOS, ScrollView, Text, TouchableOpacity} from "react-native";
import {scale} from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";
import ROW from "../../../components/shared/ROW";
import TitleText from "../../../components/shared/TitleText";
import {BackIcon, StarComment, TickCircle} from "../../../components/shared/Icons";
import Layout from "../../../components/shared/Layout";
import SubText from "../../../components/shared/SubText";
import CustomButton from "../../../components/shared/CustomButton";
import Br from "../../../components/shared/Br";
import FastImage from 'react-native-fast-image'
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "react-query";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import ErrorInternet from "../../../components/shared/ErrorInternet";
import {profileApi} from "../../../services/Api/profile";

const ProfileScreen = () => {
    const navigation = useNavigation()
    const {isLoading, data:profile,error} = useQuery('profile',profileApi, )
    if (isLoading) return <LoadingScreen/>
    if (error) return <ErrorInternet/>
    return (
        <>
            <ROW>
                <ROW ph={scale(10)} pv={scale(5)} bg='#fff'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: scale(5)}}>
                        <ROW row aligncenter>
                            <BackIcon/>
                            <TitleText style={{marginLeft: scale(10)}}>Profile</TitleText>

                        </ROW>
                    </TouchableOpacity>
                </ROW>
                <Br/>
            </ROW>

            <Layout bg='#fff' ph={scale(20)}>
                <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>

                    <ROW style={{position: 'relative'}}>
                        <ROW aligncenter justifycente>
                            <ROW br={100} w={scale(120)} aligncenter justifycenter h={scale(120)}
                                 bg={'rgba(255,255,255,0.4)'}>
                                <FastImage style={{
                                    overflow: 'hidden',
                                    borderWidth: 5,
                                    borderColor: '#fff',
                                    width: scale(100),
                                    height: scale(100),
                                    borderRadius: 100
                                }}
                                           source={{uri: 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                            </ROW>
                            <ROW mv={scale(5)}>
                                <ROW row justifycenter aligncenter>
                                    <TitleText bold={true}>{profile?.data?.fullName}</TitleText>

                                </ROW>

                                <ROW mt={scale(3)}>
                                    <SubText size={scale(12)} color={'#aeaeae'} title='level:advanse |  23 age'/>
                                </ROW>
                            </ROW>
                        </ROW>

                        <ROW mt={scale(10)}>
                            <ROW justifybetween row aligncenter w={'100%'}>
                                <CustomButton backgroundColor='#002a32' onPress={() => navigation.navigate('Chat')}
                                              title='Message'/>
                            </ROW>
                        </ROW>
                        <ROW mt={scale(10)}>
                            <ROW justifybetween row aligncenter w={'100%'}>
                                <CustomButton onPress={() => navigation.navigate('EditProfileScreen')}
                                              backgroundColor='#002a32' title='Edit Profile'/>
                            </ROW>
                        </ROW>
                        <Br mt={scale(20)} mb={scale(10)}/>
                        <ROW w={'100%'} pv={scale(10)} mb={scale(20)} mt={scale(10)} br={10} ml='auto' mr={'auto'}
                             bg={'#fff'}>
                            <TitleText>About us</TitleText>
                            <SubText style={{marginTop: 5}} title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem'/>
                        </ROW>
                        <Br/>
                        <ROW w={'100%'} mv={scale(20)} br={10} ml='auto' mr={'auto'}
                             bg={'#fff'}>
                            <TitleText>Email</TitleText>
                            <SubText style={{marginTop: 5}} title={profile?.data?.email}/>
                        </ROW>


                    </ROW>


                </ScrollView>
            </Layout>

        </>
    );
};

export default ProfileScreen;
