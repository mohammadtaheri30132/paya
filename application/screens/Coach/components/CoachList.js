import React from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import TitleText from "../../../components/shared/TitleText";
import MoreText from "../../../components/shared/MoreText";
import SubText from "../../../components/shared/SubText";
import {CancleCircle, InfoIcon, Location, SendMsg, TickCircle} from "../../../components/shared/Icons";
import Input from "../../../components/shared/Input";
import CustomButton from "../../../components/shared/CustomButton";
import {SafeAreaContext, SafeAreaView} from "react-native-safe-area-context";
import Layout from "../../../components/shared/Layout";
import SearchBar from "../../../components/shared/SearchBar";
import FastImage from 'react-native-fast-image'
import {useNavigation} from "@react-navigation/native";
import { observer } from 'mobx-react-lite';

const CoachList = ({List=[{id: 12131}, {id: 213}, {id: 3324}, {id: 223413}, {id: 223413}, {id: 324}, {id: 2}]}) => {
    
    const navigation = useNavigation()
    return (
        <Layout ph={0}>

            <FlatList
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('CoachProfile',{id:item.id})}>
                            <ROW w={'100%'} p={scale(10)}>
                                <ROW justifycenter row mr={'auto'}>
                                    <FastImage style={{
                                        overflow: 'hidden',
                                        borderWidth: 5,
                                        borderColor: '#f8f8f8',
                                        width: scale(50),
                                        height: scale(50),
                                        borderRadius: 100
                                    }}
                                               source={{uri: index % 2 === 0 ? 'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg' : 'http://dev.villanovaice.com/wp-content/uploads/2015/02/Elon-Musk-300x300.jpg'}}/>
                                    <ROW mt={scale(12)} ml={scale(10)} w={'80%'}>
                                        <ROW row justifybetween aligncenter>
                                            <TitleText bold={true}>{item.nikname}</TitleText>
                                        </ROW>
                                        <ROW row aligncenter>
                                            <TitleText size={scale(12)} bold={true}
                                                       style={{color: '#009024', marginRight: scale(5)}}>
                                               {item.address.line1}</TitleText>
                                        </ROW>
                                        <ROW row aligncenter={true} mt={scale(2)}>
                                            <SubText light={false}
                                                     title={item.aboutMe}/>
                                        </ROW>
                                    </ROW>


                                </ROW>
                                <ROW w='100%' row aligncenter mb={scale(5)} ph={scale(5)} mv={scale(15)}>
                                    <CustomButton title='Request' fontSize={scale(12)}
                                                  style={{paddingVertical: scale(10), width: '40%'}}/>
                                    <ROW ml={'auto'} aligncenter justifycenter>
                                        <TitleText>{item.ratePerHour}</TitleText>
                                    </ROW>
                                </ROW>
                            </ROW>
                        </TouchableOpacity>

                    );
                }}
                data={List}
                style={{width: '100%'}}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={
                    () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'} mv={10}></ROW>
                }
                ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                contentContainerStyle={{}}
            />
        </Layout>

    );
};

export default observer(CoachList);
const styles = StyleSheet.create({
    location: {
        position: 'relative',
        padding: scale(15)
    },
    input: {
        paddingLeft: scale(50),
        color: '#002a32'
    },
    icon: {
        position: 'absolute',
        left: scale(24),
        top: scale(22),

    }
});
