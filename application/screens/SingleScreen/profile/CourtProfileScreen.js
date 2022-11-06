import React from 'react';
import { MaskedViewIOS, SafeAreaView, ScrollView, Text} from "react-native";
import {scale} from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";
import ROW from "../../../components/shared/ROW";
import TitleText from "../../../components/shared/TitleText";
import {StarComment, TickCircle} from "../../../components/shared/Icons";
import Layout from "../../../components/shared/Layout";
import SubText from "../../../components/shared/SubText";
import CustomButton from "../../../components/shared/CustomButton";
import Br from "../../../components/shared/Br";
import FastImage from 'react-native-fast-image'
import { useQuery } from 'react-query';

import { getCourt } from '../../../services/Api/Court';

const ProfileScreen = ({route,navigation}) => {

    const id = route.params.id

    const {isLoading,data,error} = useQuery(['court',id],()=>getCourt(id))

    return (
        <SafeAreaView>
        <Layout bg='#fff' ph={scale(20)}>
            <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>

                <ROW style={{position: 'relative'}}>
                    <ROW row aligncenter justifycente>
                       
                        <ROW mh={scale(5)}>
                            <ROW row aligncenter>
                                <TitleText bold={true}>{data?.data?.name}</TitleText>
                                <ROW mh={scale(5)}>
                                    <TickCircle/>
                                </ROW>
                            </ROW>

                            <ROW>
                                <SubText size={scale(12)} color={'#aeaeae'} title={data?.data?.address?.line1+", "+data?.data?.address?.city+", "+data?.data?.address?.stateProvinceCode+" "+data?.data?.address?.zipCodePostalCode}/>
                            </ROW>

                        </ROW>


                    </ROW>

                    <ROW mt={scale(20)}>
                        <ROW justifybetween row aligncenter w={'100%'}>
                            <CustomButton style={{width: '65%'}} title='Reserve'/>
                            <ROW aligncenter>
                                <TitleText bold={true} size={scale(16)}>{'12$ per hour'}</TitleText>
                                
                            </ROW>
                        </ROW>
                    </ROW>
                    <Br mt={scale(20)} mb={scale(10)}/>
                    <ROW w={'100%'} pv={scale(10)} mb={scale(20)} mt={scale(10)} br={10} ml='auto' mr={'auto'}
                         bg={'#fff'}>
                        <TitleText>About us</TitleText>
                        <SubText style={{marginTop: 5}} title={data?.data?.description}/>
                    </ROW>


                </ROW>


            </ScrollView>
        </Layout>
        </SafeAreaView>
    );
};

export default ProfileScreen;
