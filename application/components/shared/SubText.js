import React from 'react';
import { Text} from 'react-native';
import {scale} from 'react-native-size-matters';

const SubText = ({
  title,
  light ,
  style,
  size = scale(12.5),
  color='#949494',
}) => {

  return (
    <Text
      style={[{fontSize: size,lineHeight:scale(18), color: color, fontFamily:light? 'CircularSpotifyText-Light':'CircularSpotifyText-Book'}, style]}>
      {title}
    </Text>
  );
};

export default SubText;
