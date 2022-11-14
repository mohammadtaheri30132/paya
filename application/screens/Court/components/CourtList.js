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

const CourtList = ({List=[{id: 12131}, {id: 213}, {id: 3324}, {id: 223413}, {id: 223413}, {id: 324}, {id: 2}]}) => {
    
    const navigation = useNavigation()
    return (
        <Layout ph={0}>
            
            <FlatList
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('CourtProfileScreen',{id:item.id})}>
                            <ROW w={'100%'} p={scale(10)}>
                                <ROW justifycenter row mr={'auto'}>
                                    
                                    <ROW mt={scale(12)} ml={scale(10)} w={'80%'}>
                                        <ROW row justifybetween aligncenter>
                                            <TitleText bold={true}>{item.name}</TitleText>
                                        </ROW>
                                        <ROW row aligncenter>
                                            <TitleText size={scale(12)} bold={true}
                                                       style={{color: '#009024', marginRight: scale(5)}}>
                                                {item?.address?.line1+", "+item?.address?.city+", "+item?.address?.stateProvinceCode+" "+item?.address?.zipCodePostalCode}</TitleText>
                                        </ROW>
                                        
                                    </ROW>


                                </ROW>
                                <ROW w='100%' row aligncenter mb={scale(5)} ph={scale(5)} mv={scale(15)}>
                                    
                                    <ROW ml={'auto'} aligncenter justifycenter>
                                        <TitleText>{'5$ per hour'}</TitleText>
                                    </ROW>
                                </ROW>
                            </ROW>
                        </TouchableOpacity>

                    );
                }}
                data={List}
                nestedScrollEnabled
                bounces={false}
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

export default observer(CourtList);
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
