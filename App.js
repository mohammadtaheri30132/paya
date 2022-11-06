/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState} from 'react';
import {
    LogBox,
} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';

import {scale} from 'react-native-size-matters';
import StackNavigator from './application/container/StackNavigator';
import AuthenticationState from './application/utils/AuthenticationState';
import {error_type, success_type,} from './application/utils/TostMessage';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import {ModalPortal} from "react-native-modals";
import AppNavigationContainer from "./application/container/NavigationContainer";
import CustomSplashScreen from "./application/components/CustomSplashScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";

let App: () => React$Node = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications


    const queryClient = new QueryClient({defaultOptions: {queries: {retry: 2}}});
    const [loading, setisloading] = useState(false);
    const [Authed, isAuthed] = useState(false);
    //INTETO SCREEN STATE

    useEffect(() => {
        AuthenticationState().then(async e => {
            if (e.data == true) isAuthed(true);

            setTimeout(() => {
                setisloading(true);
            }, 1500);
        });
    }, []);


    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <GestureHandlerRootView style={{flex: 1}}>
                <AnimatedSplash
                    translucent={loading}
                    isLoaded={loading}
                    customComponent={<CustomSplashScreen/>}
                    backgroundColor='white' logoHeight={300} logoWidth={300}
                >
                    <ToastProvider
                        placement="top"
                        duration={2500}
                        textStyle={{fontSize: scale(14), fontFamily: 'CircularSpotifyText-Medium'}}
                        renderType={{
                            error_type: toast => error_type(toast),
                            success_type: toast => success_type(toast),
                        }}>

                        <AppNavigationContainer>
                            <QueryClientProvider client={queryClient}>
                                <StackNavigator Authed={Authed} />
                                <ModalPortal/>
                            </QueryClientProvider>
                        </AppNavigationContainer>
                    </ToastProvider>
                </AnimatedSplash>
            </GestureHandlerRootView>
        </SafeAreaProvider>

    );
};
export default App;
