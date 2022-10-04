import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {scale} from "react-native-size-matters";
import TitleText from "../../../components/shared/TitleText";
import ROW from "../../../components/shared/ROW";
import Br from "../../../components/shared/Br";
import SubText from "../../../components/shared/SubText";
import Modal from "react-native-modal";

const RemoveUserFromCoachModal = ({isModalVisible,setModalVisible}) => {
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    return (
        <Modal
            isVisible={isModalVisible}
            customBackdrop={
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.2)"
                    }}/>
                </TouchableWithoutFeedback>
            }
        >
            <View style={{
                width: '100%',
                alignItems: 'center',
                padding: scale(20),
                backgroundColor: '#fff',
                borderRadius: 10
            }}>
                <TitleText style={{color: "#b90000", marginBottom: scale(5)}}>Remove User</TitleText>
                <ROW mt={scale(5)}></ROW>
                <Br/>
                <ROW mt={scale(10)}  aligncenter justifycenter>
                    <SubText title='Do you want remove '/>
                    <SubText style={{marginTop:scale(3)}} color='#002a32' title='Mohammad Taheri'/>
                </ROW>

                <ROW row justifybetween aligncenter mt={scale(20)}>
                    <TouchableOpacity style={{borderColor:'#b90000',borderWidth:1,paddingVertical:scale(7),borderRadius:10,width:'49%',alignItems:"center",justifyContent:'center'}}>
                        <SubText color='#b90000' title='Remove'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} style={{paddingVertical:scale(7),borderRadius:10,width:'49%',alignItems:"center",justifyContent:'center'}}>
                        <SubText color='#002a32' title='Cancel'/>
                    </TouchableOpacity>
                </ROW>
            </View>
        </Modal>
    );
};

export default RemoveUserFromCoachModal;
