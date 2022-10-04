import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const Input = ({
  style,
  placeholderTextColor = '#002A32',
  backgroundColor = '#f4f4f4',
  ...otherProps
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholderTextColor={placeholderTextColor}
      style={[style, styles.text, {backgroundColor: backgroundColor,height:50}]}
      {...otherProps}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  text: {

    color: '#002A32',
    padding: 12,
    fontFamily: 'CircularSpotifyText-Medium',
    borderRadius: 10,
    width: '100%',
  },
});
