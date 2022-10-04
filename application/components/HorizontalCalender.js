import React from 'react';
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

const HorizontalCalender = () => {
    let datesWhitelist = [{
        start: moment(),
        end: moment().add(3, 'days')  // total 4 days enabled
    }];
    let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled

    return (
        <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, highlightColor: '#002a32'}}
            style={{height: 100, paddingTop: 20, paddingBottom: 10}}
            calendarHeaderStyle={{color: '#002a32'}}
            calendarColor={'#fff'}
            scrollable
            dateNumberStyle={{color: '#002a32'}}
            dateNameStyle={{color: '#002a32'}}
            highlightDateNumberStyle={{color: '#fff'}}
            highlightDateNameStyle={{color: '#fff'}}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
            // datesWhitelist={datesWhitelist}
            // datesBlacklist={datesBlacklist}
            // iconLeft={require('./img/left-arrow.png')}
            // iconRight={require('./img/right-arrow.png')}
            iconContainer={{flex: 0.1}}
        />
    );
};

export default HorizontalCalender;
