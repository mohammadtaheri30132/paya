import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from "../../../components/shared/Layout";
import TitleText from "../../../components/shared/TitleText";
import {AddCircle, AddEvent, BackIcon, MapIcon, RemoveUser} from "../../../components/shared/Icons";
import ROW from "../../../components/shared/ROW";
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {scale} from "react-native-size-matters";
import Br from "../../../components/shared/Br";
import FastImage from "react-native-fast-image";
import SubText from "../../../components/shared/SubText";
import UserItem from "./UserItem";
import Modal from "react-native-modal";
import RemoveUserFromGroupModal from "./RemoveUserFromGroupModal";
import {
    BottomSheetFlatList,
    BottomSheetHandle,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import BottomSheetClasses from "../../Classes/components/BottomSheetClasses";

const SingleGroupScreen = ({route, navigation}) => {
    const {isEdit} = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => [160, '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, [])

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handleSheetChangesPres = useCallback((index: number) => {
        bottomSheetModalRef.current?.snapToIndex(0)
    }, []);

    useEffect(() => {
        handlePresentModalPress()
    }, [])

    return (
      <>
          <TouchableOpacity onPress={handlePresentModalPress}
                            style={styles.addCommentBtn}>
              <AddEvent/>
          </TouchableOpacity>
          <Layout>

              <RemoveUserFromGroupModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
              <BottomSheetModalProvider>
                  <BottomSheetModal
                      ref={bottomSheetModalRef}
                      index={1}
                      snapPoints={snapPoints}
                      onChange={handleSheetChanges}
                      enablePanDownToClose={false}
                      enableOverDrag={false}
                      handleHeight={200}
                      topInset={-30}
                      handleComponent={() => <ROW aligncenter justifycenter mb={scale(10)}>
                          <BottomSheetHandle/>
                          <TitleText>
                              Add Student
                          </TitleText>
                      </ROW>
                      }
                  >
                      <ROW p={scale(15)}>
                          <TextInput
                              style={styles.input}
                              placeholder='Enter you group name...'
                              placeholderTextColor='#a7a7a7'
                              // onChangeText={onChange}
                              // value={value}
                          />
                      </ROW>
                      <BottomSheetFlatList renderItem={({item, index}) => {
                          return (
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
                                                 source={{uri: index%2===0?'https://qph.cf2.quoracdn.net/main-thumb-1278318002-200-ydzfegagslcexelzgsnplcklfkienzfr.jpeg':'http://dev.villanovaice.com/wp-content/uploads/2015/02/Elon-Musk-300x300.jpg'}}/>
                                      <ROW mt={scale(10)} ml={scale(10)} w={'80%'}>
                                          <ROW row justifybetween aligncenter>
                                              <TitleText bold={true}>{index%2===0?'Mohammad Taheri':'reza akbari'}</TitleText>
                                              <TouchableOpacity onPress={()=>{}}
                                                                style={{paddingHorizontal: scale(10), paddingVertical: scale(2)}}>
                                                  <AddCircle/>
                                              </TouchableOpacity>
                                          </ROW>
                                          <ROW row aligncenter={true}>
                                              <SubText light={false} title='Advance 1'/>
                                          </ROW>
                                      </ROW>
                                  </ROW>
                              </ROW>
                          );
                      }}
                                           data={[{id: 1234234},{id: 123}, {id: 1234234}, {id: 1234}, {id: 1234}, {id: 123}]}
                                           style={{}}
                                           keyExtractor={(item, index) => index}
                                           showsHorizontalScrollIndicator={false}
                                           showsVerticalScrollIndicator={false}
                                           ItemSeparatorComponent={
                                               () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'}></ROW>
                                           }
                                           ListFooterComponent={() => <ROW h={scale(100)}></ROW>}
                                           contentContainerStyle={{}}/>
                  </BottomSheetModal>

                  <ROW justifybetween row aligncenter>
                      <ROW row aligncenter  pv={scale(5)}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                              <ROW p={scale(5)} mr={scale(10)}>
                                  <BackIcon/>
                              </ROW>
                          </TouchableOpacity>
                          <TitleText>{isEdit ? 'Group Name (23)' : 'New Group'}</TitleText>
                      </ROW>
                      <TouchableOpacity style={{paddingRight:scale(10)}}>
                          <TitleText>Done</TitleText>
                      </TouchableOpacity>

                  </ROW>
                  <Br/>

                  <ROW p={scale(10)}>
                      <TitleText size={scale(12)}>Nmae</TitleText>
                      <TextInput
                          style={styles.input}
                          placeholder='Enter you group name...'
                          placeholderTextColor='#a7a7a7'
                          // onChangeText={onChange}
                          // value={value}
                      />
                      <ROW mt={scale(30)}>
                          <TitleText size={scale(12)}>List of students</TitleText>
                      </ROW>
                  </ROW>


                  <FlatList
                      renderItem={({item, index}) => {
                          return (
                              <UserItem setModalVisible={setModalVisible}/>
                          );
                      }}
                      data={[{id: 1234234}, {id: 1234}, {id: 1234}, {id: 1234}, {id: 1234}, {id: 123}]}
                      style={{}}
                      keyExtractor={(item, index) => index}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={
                          () => <ROW w='85%' h={1} bg='#e3e3e3' mr='auto' ml={'auto'}></ROW>
                      }
                      ListFooterComponent={() => <ROW h={scale(200)}></ROW>}
                      contentContainerStyle={{}}
                  />
              </BottomSheetModalProvider>
          </Layout>
      </>
    );
};

export default SingleGroupScreen;

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#0ea960',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        right: scale(20),
        bottom: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },
    input:{
        paddingLeft:scale(10),
        fontSize:scale(11),
        borderWidth:1,
        height:scale(40),
        marginTop:scale(5),
        borderRadius:5,
        borderColor:'#a7a7a7',
        color:'#002a32'
    },


});
