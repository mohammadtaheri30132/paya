import React, {useState} from 'react';
import Layout from "../../../components/shared/Layout";
import {FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import ROW from "../../../components/shared/ROW";
import {useNavigation} from "@react-navigation/native";
import {scale} from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import TitleText from "../../../components/shared/TitleText";
import MoreText from "../../../components/shared/MoreText";
import SubText from "../../../components/shared/SubText";
import Filter from "../../../components/shared/Filter";
import Br from "../../../components/shared/Br";
import {RemoveUser} from "../../../components/shared/Icons";
import UserItem from "./UserItem";
import Modal from "react-native-modal";
import RemoveUserFromCoachModal from "./RemoveUserFromCoachModal";
import {FadeLoading} from "react-native-fade-loading";

const StudentsList = () => {
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const [saveFilter,setSaveFilter]=React.useState('Last')
    const list = [{title: 'Last'},{title: 'Advance'},{title: 'Beginer'}]

    return (
        <Layout>
            <RemoveUserFromCoachModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
            <Filter list={list} value={saveFilter} setValue={setSaveFilter} />
            <Br/>
            <FlatList
                renderItem={({item, index}) => {
                    return (
                        <>
                            <UserItem setModalVisible={setModalVisible} />
                            {/*<ROW w={'100%'} p={scale(10)}>*/}
                            {/*    <ROW justifycenter row mr={'auto'}>*/}
                            {/*        <FadeLoading style={{*/}
                            {/*            overflow: 'hidden',*/}
                            {/*            borderWidth: 5,*/}
                            {/*            borderColor: '#f8f8f8',*/}
                            {/*            width: scale(50),*/}
                            {/*            height: scale(50),*/}
                            {/*            borderRadius: 100*/}
                            {/*        }} primaryColor="#ababab"  secondaryColor="#e5e5e5" duration={2500} />*/}
                            {/*        <ROW mt={scale(10)} ml={scale(10)} w={'80%'}>*/}
                            {/*            <ROW row justifybetween aligncenter>*/}
                            {/*                <ROW w={scale(100)}>*/}
                            {/*                    <FadeLoading primaryColor="#ababab" secondaryColor="#e5e5e5" duration={2500} />*/}
                            {/*                </ROW>*/}
                            {/*                <ROW*/}
                            {/*                    style={{paddingHorizontal: scale(10), color:"#ababab",paddingVertical: scale(2)}}>*/}
                            {/*                    <ROW >*/}
                            {/*                        <FadeLoading style={{width:scale(20),height:scale(20)}} primaryColor="#ababab" secondaryColor="#e5e5e5" duration={2500} />*/}
                            {/*                    </ROW>*/}
                            {/*                </ROW>*/}
                            {/*            </ROW>*/}
                            {/*            <ROW row aligncenter={true}>*/}
                            {/*                <ROW w={scale(70)}>*/}
                            {/*                    <FadeLoading primaryColor="#ababab" secondaryColor="#e5e5e5" duration={2500} />*/}
                            {/*                </ROW>*/}
                            {/*            </ROW>*/}
                            {/*        </ROW>*/}
                            {/*    </ROW>*/}
                            {/*</ROW>*/}
                        </>
                    );
                }}
                data={[{id: 1234234}, {id: 1234}, {id: 1234}, {id: 123}, {id: 1234234}, {id: 1234}, {id: 1234}, {id: 123}, {id: 1234234}, {id: 1234}, {id: 1234}, {id: 123}, {id: 1234234}, {id: 1234}, {id: 1234}, {id: 123}]}
                style={{}}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={
                    () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'}></ROW>
                }
                ListFooterComponent={() => <ROW h={scale(150)}></ROW>}
                contentContainerStyle={{}}
            />
        </Layout>
    )
}

export default StudentsList;
