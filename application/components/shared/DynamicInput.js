import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import TitleText from './TitleText';

const DynamicInput = ({
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
    case 'longtext': {
      return (
        <>
          <TitleText style={{ marginBottom: 10 }}>{name}</TitleText>
          <TextInput
            multiline={true}
            numberOfLines={20}
            onChangeText={setValue}
            value={value}
            placeholderTextColor={placeholderTextColor}
            placeholder='write your ...'
            style={[style, styles.text, {
              backgroundColor: backgroundColor, textAlignVertical: 'top',
              color: '#002a32',
              lineHeight: Platform.OS == "android" ? 1.3 : 30,
              padding: scale(20),
              fontFamily: 'CircularSpotifyText-Medium',
              backgroundColor: '#f8f8f8',
              borderRadius: 10,
              minHeight: 100
            }]}
            {...otherProps}
          />
        </>
      )
    }
    case 'number': {
      return (
        <>
          <TitleText style={{ marginBottom: 10 }}>{name}</TitleText>
          <TextInput
            value={value}
            onChangeText={setValue}
            autoCapitalize="none"
            keyboardType={'number-pad'}
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

export default DynamicInput;

const styles = StyleSheet.create({
  text: {

    color: '#002A32',
    padding: 12,
    fontFamily: 'CircularSpotifyText-Medium',
    borderRadius: 10,
    width: '100%',
  },
});
