import React from 'react';
import {Image, View} from "react-native";
import Layout from "./shared/Layout";

const CustomSplashScreen = () => {
    return (
        <Layout>

        <View style={{
            flex: 1,
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View>
                <Image style={{width:300,height:300}} source={require('./../assets/image/logo.png')} />
            </View>
        </View>
        </Layout>

    );
};

export default CustomSplashScreen;
