import React, {useState} from 'react';
import Layout from "../../../components/shared/Layout";
import {StyleSheet, FlatList, TouchableOpacity} from "react-native";
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import TitleText from "../../../components/shared/TitleText";
import {AddEvent, ArrowRight} from "../../../components/shared/Icons";
import Br from "../../../components/shared/Br";
import SubText from "../../../components/shared/SubText";
import {useNavigation} from "@react-navigation/native";

const GroupsList = () => {
    const navigation = useNavigation()
    return (
        <ROW flex bg='#fff'>
            <TouchableOpacity onPress={() => navigation.navigate('SingleGroupScreen',{isEdit:false})} style={styles.addCommentBtn}>
                <AddEvent/>
            </TouchableOpacity>
            <FlatList
                renderItem={({item, index}) => {
                    return (
                      <>
                          <TouchableOpacity onPress={() => navigation.navigate('SingleGroupScreen',{isEdit:true})}>
                              <ROW p={scale(15)}  row aligncenter justifybetween>
                                  <ROW row justifycenter aligncenter>
                                      <TitleText>Group name</TitleText>
                                      <SubText size={scale(10)} title='  (12 member)'/>
                                  </ROW>
                                  <ROW row aligncenter>
                                      <ROW style={{}}>
                                          <ArrowRight/>
                                      </ROW>
                                  </ROW>
                              </ROW>
                          </TouchableOpacity>
                          <Br/>
                      </>
                    );
                }}
                data={[{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212},{id:2},{id:212}  ]}
                style={{width: '100%'}}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={
                    () => <ROW w='100%' h={1} bg={'#cecece'}  mr='auto' ml={'auto'} ></ROW>
                }
                ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                contentContainerStyle={{}}
            />


        </ROW>
    )
}

export default GroupsList;

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#0ea960',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        right: scale(20),
        bottom: scale(80),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },


});

