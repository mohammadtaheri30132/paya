import React from 'react';
import { Text} from 'react-native';
import {scale} from 'react-native-size-matters';

const TitleText = ({children, style, color='#002a32', bold = true, size = scale(13.5)}) => {

  return (
    <Text
      style={[
        bold
          ? {fontFamily: 'CircularSpotifyText-Bold'}
          : {fontFamily: 'CircularSpotifyText-Medium'},
        {fontSize: size, color: color},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TitleText;
