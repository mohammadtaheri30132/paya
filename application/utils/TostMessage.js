import React from 'react';

import {Text, View,} from 'react-native';
import {scale} from 'react-native-size-matters';

export const error_type = toast => {
    return (
        <View
            style={{
                padding: 15,
                backgroundColor: '#D13743',
                margin: 10,
                width: '80%',
                borderRadius: 12,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#fff',
                marginTop: scale(30),

                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            <Text
                style={{
                    fontFamily: 'CircularSpotifyText-Medium',
                    fontSize: scale(12),
                    color: '#fff',
                    marginHorizontal: 20,
                }}>
                {toast.message}
            </Text>
        </View>
    );
};

export const success_type = toast => {
    return (
        <View
            style={{
                padding: 15,
                marginTop: scale(30),
                backgroundColor: '#0ea960',
                margin: scale(10),
                width: '80%',

                borderRadius: 12,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>

            <Text
                style={{
                    fontFamily: 'CircularSpotifyText-Medium',
                    fontSize: scale(12),
                    color: '#fff',
                    marginHorizontal: 20,
                }}>
                {toast.message}
            </Text>
        </View>
    );
};
