import React, {useCallback, useMemo, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabsNavigator';
import {Platform} from 'react-native';
import AddCommentsScreen from "../screens/SingleScreen/AddCommentsScreen";
import CreateForm1 from "../screens/Other/CreateForm1";
import SinglePostScreen from "../screens/SingleScreen/Post/SinglePostScreen";
import SingleGroupScreen from "../screens/Student/components/SingleGroupScreen";
import ProfileScreen from "../screens/SingleScreen/profile/ProfileScreen";
import AddPostScreen from "../screens/SingleScreen/Post/AddCommentScreen";
import CoachProfileScreen from "../screens/SingleScreen/profile/CoachProfileScreen";
import EditProfileScreen from "../screens/SingleScreen/profile/EditProfileScreen";
import Chat from "../screens/SingleScreen/Chat/Chat";
import Login from "../screens/Auth/Login";


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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SingleGroupScreen" component={SingleGroupScreen} />
        <Stack.Screen name="CoachProfile" component={CoachProfileScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
        <Stack.Screen name="AddCommentsScreen" component={AddCommentsScreen} />

        <Stack.Screen name="CreateForm1" component={CreateForm1} />
        {/*<Stack.Screen name="SingINUpScreen" component={SingINUpScreen} />*/}
      </Stack.Navigator>
  );
};
export default StackNavigator;
