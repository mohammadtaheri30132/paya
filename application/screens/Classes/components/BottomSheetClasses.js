import React from 'react';
import {TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import ClassList from "../../Calender/components/ClassList";
import ROW from "../../../components/shared/ROW";
import {scale} from "react-native-size-matters";
import TitleText from "../../../components/shared/TitleText";
import UserAreaEvent from "../../Calender/components/UserAreaEvent";

const BottomSheetClasses = ({classList,setClassList}) => {

    return (
        <ScrollView >

            <ROW justifybetween  aligncenter row>
                <TouchableOpacity onPress={()=>setClassList((prev)=>!prev)} style={[styles.btn,classList&&styles.active]}>
                    <TitleText color={classList?'#0ea960':'#c0c0c0'} size={scale(13)} >Events Inyour Area</TitleText>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setClassList((prev)=>!prev)} style={[styles.btn,classList===false&&styles.active]}>
                    <TitleText color={classList?'#c0c0c0':'#0ea960'} size={scale(13)} >Your Upcoming Events</TitleText>
                </TouchableOpacity>
            </ROW>
            {classList?(
                <>

                    <ClassList/>
                </>
            ):(
                <UserAreaEvent/>
            )}
        </ScrollView>
    );
};

export default BottomSheetClasses;
const styles = StyleSheet.create({


    btn:{
        width:'50%',
        padding:scale(10),
        paddingBottom:scale(20),
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#c0c0c0',
        borderBottomWidth:scale(1),

    },
    active:{

        borderColor:'#0ea960',
        backgroundColor:'#fbfffd'
    }

});
