import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import TitleText from './TitleText';

const AddressInput = ({
  name,
  type,
  value,
  setValue,
  style,
  placeholderTextColor = '#002A32',
  backgroundColor = '#f4f4f4',
  ...otherProps
}) => {
  switch (type) {
    case 'text': {
      return (
        <>
          <TitleText style={{ marginBottom: 10 }}>{(name)}</TitleText>
          <TextInput
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            placeholderTextColor={placeholderTextColor}
            style={[style, styles.text, { backgroundColor: backgroundColor, height: 50 }]}
            {...otherProps}
          />
        </>
      )
    }
    
  }
  return
};

export default AddressInput;

const styles = StyleSheet.create({
  text: {

    color: '#002A32',
    padding: 12,
    fontFamily: 'CircularSpotifyText-Medium',
    borderRadius: 10,
    width: '100%',
  },
});
