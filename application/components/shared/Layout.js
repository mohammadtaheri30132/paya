import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {scale} from "react-native-size-matters";

const Layout = ({ children,ph=scale(5),pv=scale(0),bg='#fff'}) => {

    return (
    <SafeAreaView style={{paddingHorizontal:scale(ph),paddingVertical:scale(pv),backgroundColor:bg?bg:'#fff'}}>
      <StatusBar backgroundColor={'#fff'} hidden={false} translucent={false}/>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
