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
import { getCoach } from '../../../services/Api/Coach';

const ProfileScreen = ({route,navigation}) => {

    const id = route.params.id

    const {isLoading,data,error} = useQuery(['coach',id],()=>getCoach(id))

    return (
        <SafeAreaView>
        <Layout bg='#fff' ph={scale(20)}>
            <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>

                <ROW style={{position: 'relative'}}>
                    <ROW row aligncenter justifycente>
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
                                       source={{uri:'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg'}}/>
                        </ROW>
                        <ROW mh={scale(5)}>
                            <ROW row aligncenter>
                                <TitleText bold={true}>{data?.data?.nikname}</TitleText>
                                <ROW mh={scale(5)}>
                                    <TickCircle/>
                                </ROW>
                            </ROW>

                            <ROW>
                                <SubText size={scale(12)} color={'#aeaeae'} title={`${data?.data?.level.name} |  23 age`}/>
                            </ROW>

                            <ROW row aligncenter mt={scale(2)}>
                                {Array.from({length: 5 - parseInt(0)}, (item, index) =>
                                    <StarComment back={false} width={15} height={15}/>,
                                )}
                            </ROW>
                        </ROW>


                    </ROW>

                    <ROW mt={scale(20)}>
                        <ROW justifybetween row aligncenter w={'100%'}>
                            <CustomButton style={{width: '65%'}} title='Available classes'/>
                            <ROW aligncenter>
                                <TitleText bold={true} size={scale(16)}>{data?.data?.ratePerHour}</TitleText>
                                <SubText color={'#aeaeae'} title='Praivet class'/>
                            </ROW>
                        </ROW>
                    </ROW>
                    <Br mt={scale(20)} mb={scale(10)}/>
                    <ROW w={'100%'} pv={scale(10)} mb={scale(20)} mt={scale(10)} br={10} ml='auto' mr={'auto'}
                         bg={'#fff'}>
                        <TitleText>About us</TitleText>
                        <SubText style={{marginTop: 5}} title={data?.data?.aboutMe}/>
                    </ROW>


                </ROW>


            </ScrollView>
        </Layout>
        </SafeAreaView>
    );
};

export default ProfileScreen;
