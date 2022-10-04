import React from 'react';
import Posts from "../../components/Posts";
import {ScrollView, StyleSheet} from "react-native";
import Layout from "../../components/shared/Layout";
import ROW from "../../components/shared/ROW";
import Input from "../../components/shared/Input";
import {Location} from "../../components/shared/Icons";
import {scale} from "react-native-size-matters";
import SearchBar from "../../components/shared/SearchBar";

const CocheHomeScreen = () => {
    return (
        <>
            <Layout>
                <ScrollView stickyHeaderIndices={[0]} nestedScrollEnabled >
                    <Posts list={[{id:12},{id:31},{id:12},{id:12},{id:11}]} />
                </ScrollView>
            </Layout>
        </>
    );
};

export default CocheHomeScreen;
const styles = StyleSheet.create({
    location:{
        position: 'relative',

    },
    input:{
        paddingLeft:scale(50),
        color:'#002a32'
    },
    icon:{
        position:'absolute',
        left:scale(8),
        top:scale(8),

    }
});
