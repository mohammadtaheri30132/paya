import React from 'react';
import ROW from "./ROW";
import { scale } from "react-native-size-matters";
import Input from "./Input";
import { Location } from "./Icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from 'react-native-fast-image'
import { useNavigation } from "@react-navigation/native";
import userStore from '../../store/user.store';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-gesture-handler';

const SearchBar = ({setCenterMap}) => {
    const navigation = useNavigation()
    return (
        <ROW ph={scale(10)} pb={scale(10)} row bg={'#fff'} aligncenter justifybetween>
            <ROW w='82%' h={scale(60)} style={{position:'relative'}} >
                <GooglePlacesAutocomplete
                    //GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    placeholder='Search ...'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log("data", data);
                        console.log("details", details);
                        userStore.setCenterMap([details.geometry.location.lng, details.geometry.location.lat])
                        

                        //console.log("loc", details.geometry.location);
                    }}
                    styles={{
                        container:{
                            position:'absolute',
                            
                            width:'100%',
                            paddingLeft:scale(50),marginTop:scale(10)
                        }
                    }}
                    query={{
                        key: userStore.googlePlacesApiKey,
                        language: 'en',
                        components: 'country:us',
                    }}
                    currentLocation={true}
                    currentLocationLabel='Current location'

                />
                {/* <Input placeholder={'Search ... '} placeholderTextColor='#002a32' style={styles.inputSearch}/> */}
                <ROW style={styles.icon}>
                    <Location />
                </ROW>
            </ROW>
            <TouchableOpacity style={{ height: scale(50) }} onPress={() => navigation.navigate('ProfileScreen')}>
                <FastImage style={{
                    width: scale(40),
                    height: scale(40),
                    borderColor: '#002a32',
                    borderWidth: scale(1),
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    backgroundColor: '#f6f6f6',
                    borderRadius: 100
                }}
                    resizeMode={'cover'}
                    source={{ uri: '' }} />
            </TouchableOpacity>
        </ROW>

    );
};

export default SearchBar;

const styles = StyleSheet.create({

    inputSearch: {
        paddingLeft: scale(50),
        marginTop: scale(10),
        color: '#002a32'
    },
    icon: {
        position: 'absolute',
        left: scale(10),
        top: scale(18),

    }
});
