import React from 'react';
import { ScrollView, StyleSheet, } from "react-native";
import HorizontalCalender from "../../../components/HorizontalCalender";
import EventList from "../../../components/EventList";

const ClassList = () => {
    return (
      <>

          <ScrollView style={{width: '100%', backgroundColor: '#fff'}}>
              <HorizontalCalender/>
              <EventList/>
          </ScrollView>

      </>

    );
};

export default ClassList;

const styles = StyleSheet.create({


});
