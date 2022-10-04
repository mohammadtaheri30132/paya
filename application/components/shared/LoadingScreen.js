import React from 'react';

import { View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {scale} from 'react-native-size-matters';
import SubText from './SubText';

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
      <Spinner
        isVisible={true}
        // size={this.state.size}
        type="Bounce"
        color='#002a32'
      />
      <SubText
        style={{color:'#002a32', marginTop: scale(10)}}
        title="در حال دریافت اطلاعات ..."
      />
    </View>
  );
};

export default LoadingScreen;
