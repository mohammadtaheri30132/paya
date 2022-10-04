import React from 'react';

import { useWindowDimensions} from "react-native";

import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import UserAreaEvent from "./components/UserAreaEvent";
import TimeEvent from "./components/ClassList";

const CoachCalenderScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Event in your Area'},
        {key: 'second', title: 'Your upcoming event'},
    ]);

    const renderScene = SceneMap({
        first: UserAreaEvent,
        second: TimeEvent,
    });
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#002a32' }}
            labelStyle={{color:'#002a32'}}
            style={{ backgroundColor: 'white' ,color:'#002a32'}}
        />
    );
    return (

        <>

            <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}/>
        </>


    );
};

export default CoachCalenderScreen;
