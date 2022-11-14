/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    LogBox,
} from 'react-native';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { ToastProvider, useToast } from 'react-native-toast-notifications';

import { scale } from 'react-native-size-matters';
import StackNavigator from './application/container/StackNavigator';
import AuthenticationState from './application/utils/AuthenticationState';
import { error_type, success_type, } from './application/utils/TostMessage';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import { ModalPortal } from "react-native-modals";
import AppNavigationContainer from "./application/container/NavigationContainer";
import CustomSplashScreen from "./application/components/CustomSplashScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

let App: () => React$Node = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications


    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                // show error toasts if react-query's background fetch fails
                if (query.state.data !== undefined) {
                    alert(error.request.message);
                    //displayToast("error", "an appropriate title like... Server not reachable", "an appropriate error message")
                }
                // display error toast for ALL of our queries and mutations.. at a single place here meaning no local onError handler
                else {
                    //title: Authentication Failed.. fetched from meta
                    alert(error.message);
                    //displayToast("error", title, error.message)
                }
            },
        }),
        mutationCache: new MutationCache({
            onError: (error) => {

                // display error toast for ALL of our queries and mutations.. at a single place here meaning no local onError handler

                //title: Authentication Failed.. fetched from meta
                alert(error.message);
                //displayToast("error", title, error.message)

            },
        }),
        defaultOptions: {
            queries: {
                retry: 1
            }
        }
    });
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>

                <AnimatedSplash
                    translucent={loading}
                    isLoaded={loading}
                    customComponent={<CustomSplashScreen />}
                    backgroundColor='white' logoHeight={300} logoWidth={300}
                >
                    <ToastProvider
                        placement="top"
                        duration={2500}
                        textStyle={{ fontSize: scale(14), fontFamily: 'CircularSpotifyText-Medium' }}
                        renderType={{
                            error_type: toast => error_type(toast),
                            success_type: toast => success_type(toast),
                        }}>
                        <AppNavigationContainer>
                            <QueryClientProvider client={queryClient}>
                                <StackNavigator Authed={Authed} />
                            </QueryClientProvider>
                        </AppNavigationContainer>
                    </ToastProvider>
                </AnimatedSplash>

            </SafeAreaProvider >
        </GestureHandlerRootView>

    );
};
export default App;
