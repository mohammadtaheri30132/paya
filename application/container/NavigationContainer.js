import React from 'react';
import {Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

const AppNavigationContainer = ({children}) => {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    return (
        <NavigationContainer
            ref={navigationRef}

            fallback={<Text>Loading...</Text>}
            onReady={() => {
                routeNameRef.current =
                    navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                }
                routeNameRef.current = currentRouteName;
            }}>
        {
            children
        }
        </NavigationContainer>
    );
};

export default AppNavigationContainer;
