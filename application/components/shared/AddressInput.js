import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { scale } from 'react-native-size-matters';
import userStore from '../../store/user.store';
import ROW from './ROW';
import TitleText from './TitleText';
navigator.geolocation = require('@react-native-community/geolocation');
const AddressInput = ({
  address, setAddress
}) => {

  const changeAddress = (name,value) =>{
    switch(name){
      case 'line1':{
        setAddress({
          ...address,
          line1 : value,
          
        })
        break;
      }
      case 'line2':{
        setAddress({
          ...address,
          line2 : value,
        })
        break;
      }
      case 'line3':{
        setAddress({
          ...address,
          line3 : value,
        })
        break;
      }
      case 'city':{
        setAddress({
          ...address,
          city : value,
        })
        break;
      }
      case 'CountryDistrictname':{
        setAddress({
          ...address,
          CountryDistrictname : value,
        })
        break;
      }
      case 'countryCode':{
        setAddress({
          ...address,
          countryCode : value,
        })
        break;
      }
      case 'stateProvinceCode':{
        setAddress({
          ...address,
          stateProvinceCode : value,
        })
        break;
      }
      case 'zipCodePostalCode':{
        setAddress({
          ...address,
          zipCodePostalCode : value,
        })
        break;
      }
      case 'latitude':{
        setAddress({
          ...address,
          latitude : value,
        })
        break;
      }
      case 'longitude':{
        setAddress({
          ...address,
          longitude : value,
        })
        break;
      }
    }
   
  }


  return (
    <>
      <TitleText style={{ marginBottom: 10 }}>Search Address</TitleText>
      <GooglePlacesAutocomplete
        //GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("data", data);
          console.log("details", details);
          setAddress({
            ...address,
            line1 : details.address_components[0].short_name,
            city : details.address_components[1].short_name,
            CountryDistrictname : details.address_components[2].short_name,
            countryCode : details.address_components[4].short_name,
            stateProvinceCode : details.address_components[3].short_name,
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
          })
          
          //console.log("loc", details.geometry.location);
        }}
        query={{
          key: userStore.googlePlacesApiKey,
          language: 'en',
          components: 'country:us',
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
        textInputProps={{
          InputComp: TextInput,
          leftIcon: { type: 'font-awesome', name: 'chevron-left' },
          style: {
            placeholderTextColor: '#002A32',
            backgroundColor: '#f4f4f4',
            height: 50,
            width: "100%",
            color: '#002A32',
            padding: 12,
            fontFamily: 'CircularSpotifyText-Medium',
            borderRadius: 10,
          },
          errorStyle: { color: 'red' },
        }}
      />
      <ROW flex >
        <TitleText style={{ marginBottom: 10 }}>Line 1</TitleText>
        <TextInput value={address.line1} onChangeText={(e)=>changeAddress("line1",e.value)} style={styles.input} />
      </ROW>
      <ROW flex >
        <TitleText style={{ marginBottom: 10 }}>Line 2</TitleText>
        <TextInput value={address.line2} onChangeText={(e)=>changeAddress("line2",e.value)} style={styles.input} />
      </ROW>
      <ROW flex >
        <TitleText style={{ marginBottom: 10 }}>Line 3</TitleText>
        <TextInput value={address.line3} onChangeText={(e)=>changeAddress("line3",e.value)} style={styles.input} />
      </ROW>
      <ROW row>
        <ROW flex mr={5}>
          <TitleText style={{ marginBottom: 10 }}>City</TitleText>
          <TextInput value={address.city} onChangeText={(e)=>changeAddress("city",e.value)} style={styles.input} />
        </ROW>
        <ROW flex ml={5}>
          <TitleText style={{ marginBottom: 10 }}>District Name</TitleText>
          <TextInput value={address.CountryDistrictname} onChangeText={(e)=>changeAddress("CountryDistrictname",e.value)} style={styles.input} />
        </ROW>
      </ROW>
      <ROW row>
        <ROW flex mr={5}>
          <TitleText style={{ marginBottom: 10 }}>Zip Code</TitleText>
          <TextInput value={address.zipCodePostalCode} onChangeText={(e)=>changeAddress("zipCodePostalCode",e.value)} style={styles.input} />
        </ROW>
        <ROW flex ml={5} mr={5}>
          <TitleText style={{ marginBottom: 10 }}>County Code</TitleText>
          <TextInput value={address.countryCode} onChangeText={(e)=>changeAddress("countryCode",e.value)} style={styles.input} />
        </ROW>
        <ROW flex ml={5}>
          <TitleText style={{ marginBottom: 10 }}>State Code</TitleText>
          <TextInput value={address.stateProvinceCode} onChangeText={(e)=>changeAddress("stateProvinceCode",e.value)} style={styles.input} />
        </ROW>
      </ROW>
      <ROW row>
        <ROW flex mr={5}>
          <TitleText style={{ marginBottom: 10 }}>Latitude</TitleText>
          <TextInput value={address.latitude != null && address.latitude.toString()} onChangeText={(e)=>changeAddress("latitude",e.value)} style={styles.input} />
        </ROW>
        <ROW flex ml={5}>
          <TitleText style={{ marginBottom: 10 }}>Longitude</TitleText>
          <TextInput value={address.longitude != null && address.longitude.toString()} onChangeText={(e)=>changeAddress("longitude",e.value)} style={styles.input} />
        </ROW>
      </ROW>


    </>
  )




};

export default AddressInput;

const styles = StyleSheet.create({
  input: {
    placeholderTextColor: '#002A32',
    backgroundColor: '#f4f4f4',
    height: 50,
    width: "100%",
    color: '#002A32',
    padding: 12,
    fontFamily: 'CircularSpotifyText-Medium',
    borderRadius: 10,
  },
  text: {

    color: '#002A32',
    padding: 12,
    fontFamily: 'CircularSpotifyText-Medium',
    borderRadius: 10,
    width: '100%',
  },
});
