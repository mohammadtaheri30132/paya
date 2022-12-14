import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CalenderIocn, Classes, Coach, Courts, Home, Map, Messages, StudentsIcon} from '../components/shared/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';

import ProfileScreen from "../screens/SingleScreen/profile/ProfileScreen";
import MessagesScreen from "../screens/Messages/MessagesScreen";
import Screen1 from "../screens/Other/Screen1/Screen1";
import CoachList from "../screens/Coach/components/CoachList";
import MapScreen from "../screens/Classes/ClassesMapScreen";
import {UserContext} from "../context";
import stor from './../store/user.store'
import CocheHomeScreen from "../screens/Home/CoachHomeScreen";
import CoachMapScreen from "../screens/Coach/CoachMapScreen";
import ClassesMapScreen from "../screens/Classes/ClassesMapScreen";
import StudentsScreen from "../screens/Student/StudentsScreen";
import CoachCalenderScreen from "../screens/Calender/CoachCalenderScreen";
import Setting from "../screens/setting";
import { observer } from "mobx-react-lite"
import CoachHomeScreen from "../screens/Home/CoachHomeScreen"; // Or "mobx-react".
import CourtMapScreen from '../screens/Court/CourtMapScreen';

const Tab = createBottomTabNavigator()

const TabNavigator = ({navigation}) => {

    // React.useEffect(() => {
    //   const _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('token');
    //       if (value === null) {
    //         navigation.replace('SingINUpScreen');
    //       }
    //     } catch (error) {}
    //   };
    //
    //   _retrieveData();
    // }, []);

    return (
        <Tab.Navigator

            initialRouteName="Students"
            screenOptions={({route}) => ({
                headerShown: false,

                tabBarActiveTintColor: '#0ea960',

                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'Home') {
                        return (
                            <Home active={focused}/>
                        );
                    } else if (route.name === 'Messages') {
                        return (
                            <Messages active={focused}/>
                        )
                    } else if (route.name === 'Coach') {
                        return (
                            <Coach active={focused}/>
                        )
                    } else if (route.name === 'Courts') {
                        return (
                            <Courts active={focused}/>
                        )
                    } else if (route.name === 'Students') {
                        return (
                            <StudentsIcon active={focused}/>
                        )
                    } else if (route.name === 'Classes') {
                        return (
                            <Classes active={focused}/>
                        )
                    } else if (route.name === 'Calender') {
                        return (
                            <CalenderIocn active={focused}/>
                        );
                    }
                },
                tabBarInactiveTintColor: '#979797',
                tabBarLabelStyle: {
                    fontFamily: 'CircularSpotifyText-Bold',
                    fontSize: scale(10),
                },

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    borderTopWidth: 0,
                    padding: 10,
                    paddingBottom: 10,
                    height: scale(65),
                    backgroundColor: '#fff',
                },
            })}>
            {stor.isCoche ? (
                <>
                    <Tab.Screen name="Home" component={CocheHomeScreen}/>
                    <Tab.Screen name="Students" component={StudentsScreen}/>
                    <Tab.Screen name="Messages" component={MessagesScreen}/>
                    <Tab.Screen name="Calender" component={CoachCalenderScreen}/>
                    <Tab.Screen name="setting" component={Setting}/>
                </>
            ) : (
                <>
                    <Tab.Screen name="setting" component={Setting}/>
                    <Tab.Screen name="Home" component={CoachHomeScreen}/>
                    <Tab.Screen name="Coach" component={CoachMapScreen}/>
                    <Tab.Screen name="Classes" component={ClassesMapScreen}/>
                    <Tab.Screen name="Courts" component={CourtMapScreen}/>
                    <Tab.Screen name="Messages" component={MessagesScreen}/>
                </>

            )}


        </Tab.Navigator>
    );
};
export default observer(TabNavigator);
