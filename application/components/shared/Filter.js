import React from 'react';
import {StyleSheet} from 'react-native'
import {scale} from "react-native-size-matters";
import ROW from "./ROW";
import SubText from "./SubText";
import {TouchableOpacity} from "react-native";

const Filter = ({list,value,setValue}) => {

    return (
        <ROW row pv={scale(15)}  >
            {list.map(item=>(
                <TouchableOpacity onPress={()=>setValue(item.title)} >
                    <SubText
                        style={[styles.btn,item.title===value&&{backgroundColor:'#002A32', color:'#FFF'}]}
                        title={item.title}/>
                </TouchableOpacity>
            ))}
        </ROW>
    )
}

export default Filter;
const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: scale(15),
        borderRadius: 50,
        textAlign: 'center',
        paddingVertical: scale(5),
        marginLeft: scale(20)
    },
})
