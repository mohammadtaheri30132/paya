import React, { useCallback, useState } from 'react';
import Posts from "../../components/Posts";
import {ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import Layout from "../../components/shared/Layout";
import ROW from "../../components/shared/ROW";
import Input from "../../components/shared/Input";
import { AddEvent, Location } from "../../components/shared/Icons";
import { scale } from "react-native-size-matters";
import SearchBar from "../../components/shared/SearchBar";
import LoadingScreen from "../../components/shared/LoadingScreen";
import ErrorInternet from "../../components/shared/ErrorInternet";
import { getDiscussion } from '../../services/Api/Discussion';
import { useQuery } from 'react-query';

const CoachHomeScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState([]);
    const { isLoading,isFetching, data: List, error } = useQuery(['discussions'], () => getDiscussion({ dist: 1945055, latt: '33.669445', long: '-117.823059', o: 'd', ob: 'updatedAt' }), {
        onSuccess: (data) => {
            console.log(data?.data?.config?.userInfo); // undefined
            setUserInfo(data?.data?.config?.userInfo);
        }
    })

    const getUserInfo = useCallback((id) => {
        return userInfo.find(x => x.id === id);
    }, [userInfo]);

    if (isLoading) return <LoadingScreen />
    if (error) return <ErrorInternet />



    return (
        <>
            {isFetching &&(
                <ROW style={styles.loading}>
                    <ActivityIndicator size={'small'} color={'#fff'}/>
                </ROW>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('AddPostScreen')} style={styles.addCommentBtn}>
                <AddEvent />
            </TouchableOpacity>
            <Layout>
                <ScrollView stickyHeaderIndices={[0]} nestedScrollEnabled >
                    <SearchBar />
                    <Posts getUserInfo={getUserInfo} list={List?.data?.data} />
                </ScrollView>
            </Layout>
        </>
    );
};

export default CoachHomeScreen;
const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#002a32',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        right: scale(20),
        bottom: scale(80),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },

    loading:{
        borderRadius:20,
        zIndex:99999999999,
        position:'absolute',
        backgroundColor: '#002a32',
        top:scale(70),
        alignSelf: 'center',
        width: scale(30),
        height: scale(30),
        justifyContent:'center',
        alignItems:'center'
    },
});
