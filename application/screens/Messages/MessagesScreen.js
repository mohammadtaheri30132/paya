import React from 'react';
import Layout from "../../components/shared/Layout";
import {ScrollView, useWindowDimensions, Text} from "react-native";
import {scale} from "react-native-size-matters";
import TitleText from "../../components/shared/TitleText";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Messages} from "../../components/shared/Icons";
import MessagesTab from "./components/MessagesTab";
import RequestTab from "./components/RequestTab";
import {SafeAreaView} from "react-native-safe-area-context";

const MessagesScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Messages'},
        {key: 'second', title: 'Requests'},
    ]);

    const renderScene = SceneMap({
        first: MessagesTab,
        second: RequestTab,
    });
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#002a32' }}
            labelStyle={{color:'#002a32'}}
            style={{ backgroundColor: 'white' ,color:'#002a32', }}

        />
    );
    return (


    <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}/>

    );
};

export default MessagesScreen;
