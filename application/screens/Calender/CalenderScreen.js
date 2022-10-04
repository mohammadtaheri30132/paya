import React from 'react';
import Layout from "../../components/shared/Layout";
import {ScrollView, StyleSheet} from "react-native";
import EventList from "../../components/EventList";
import ROW from "../../components/shared/ROW";
import Input from "../../components/shared/Input";
import {Location} from "../../components/shared/Icons";
import {scale} from "react-native-size-matters";
import {SafeAreaView} from "react-native-safe-area-context";
import HorizontalCalender from "../../components/HorizontalCalender";

const CalenderScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff'}} >
            <ScrollView stickyHeaderIndices={[1]} nestedScrollEnabled>
                <ROW style={styles.location} row bg={'#fff'}  >
                    <Input placeholder={'Search ... '} placeholderTextColor='#002a32' style={styles.input} />
                    <ROW style={styles.icon}>
                        <Location/>
                    </ROW>
                </ROW>
                <HorizontalCalender/>
                <EventList/>

            </ScrollView>
        </SafeAreaView>
    );
};

export default CalenderScreen;
const styles = StyleSheet.create({
    location:{
        position: 'relative',
        backgroundColor:'#fff',
        padding:scale(5),
        margin:scale(5)
    },
    input:{
        paddingLeft:scale(50),
        color:'#002a32'
    },
    icon:{
        position:'absolute',
        left:scale(8),
        top:scale(12),

    }
});
