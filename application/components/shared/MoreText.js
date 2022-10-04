import React, {useEffect,useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const MoreText = ({title, style,bold=true,limit=29,size = scale(12)}) => {
    const [state, setState] = useState(title);
    useEffect(()=>{
        if (title.length > limit){
            let newText =title.slice(0, limit) + " ..."
            setState(newText)
        }
    },[])
    return (
        <Text style={[{fontSize: size,color: '#949494',},bold?{fontFamily: 'CircularSpotifyText-Book'}:{fontFamily: 'CircularSpotifyText-Light'}, style,]}>{state}</Text>
    );
};

export default MoreText;
