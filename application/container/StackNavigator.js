import React, {useCallback, useMemo, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabsNavigator';
import {Platform} from 'react-native';
import AddCommentsScreen from "../screens/Other/AddCommentsScreen";
import CreateForm1 from "../screens/Other/CreateForm1";
import SinglePostScreen from "../screens/SingleScreen/SinglePostScreen";
import SingleGroupScreen from "../screens/Student/components/SingleGroupScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";


const Stack = createNativeStackNavigator();

const StackNavigator = ({Authed}) => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: Platform.constants.Release > 8 ? true : false,
        }}
        initialRouteName={true ? 'TabNavigator' : 'TabNavigator'}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SinglePost" component={SinglePostScreen} />
        <Stack.Screen name="SingleGroupScreen" component={SingleGroupScreen} />
        <Stack.Screen name="CoachProfile" component={ProfileScreen} />
        <Stack.Screen name="AddCommentsScreen" component={AddCommentsScreen} />

        <Stack.Screen name="CreateForm1" component={CreateForm1} />
        {/*<Stack.Screen name="SingINUpScreen" component={SingINUpScreen} />*/}
      </Stack.Navigator>
  );
};
export default StackNavigator;
