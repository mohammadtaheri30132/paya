import React from 'react';

import {ActivityIndicator, View} from 'react-native';
import {scale} from 'react-native-size-matters';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <ActivityIndicator size='small' color='#002a32'/>

    </View>
  );
};

export default LoadingScreen;
