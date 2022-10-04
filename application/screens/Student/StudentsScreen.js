import React from 'react';
import {useWindowDimensions} from "react-native";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";

import GroupsList from "./components/GroupsList";
import StudentsList from "./components/StudentsList";
import ROW from "../../components/shared/ROW";

const StudentsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Students'},
        {key: 'second', title: 'Groups'},
    ]);

    const renderScene = SceneMap({
        first:StudentsList,
        second:GroupsList ,
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

export default StudentsScreen;
