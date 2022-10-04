import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import MapboxGL, {Logger} from '@rnmapbox/maps';
import {scale} from 'react-native-size-matters';
import {
    BottomSheetHandle,
    BottomSheetModal,
    BottomSheetModalProvider, BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import ROW from "../../components/shared/ROW";
import {AddEvent,  MapIcon} from "../../components/shared/Icons";
import BottomSheetClasses from "./components/BottomSheetClasses";
import SearchBar from "../../components/shared/SearchBar";
import Layout from "../../components/shared/Layout";
import TitleText from "../../components/shared/TitleText";
import SubText from "../../components/shared/SubText";

//config map box
//MapboxGL.setWellKnownTileServer("Mapbox")
MapboxGL.setAccessToken("pk.eyJ1IjoiYWxheXpoYSIsImEiOiJjamc1b2kwM3MwMDBzMnFsaTl4NnY3ZjRoIn0.-yUx74UjfUfQnWRogmWQ1w");
//MapboxGL.setTelemetryEnabled(false);


const MapScreen = ({navigation}) => {
    const [region, setRegion] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(1)
    const [classList, setClassList] = React.useState(false)

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => [140, '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handleSheetChangesPres = useCallback((index: number) => {
        bottomSheetModalRef.current?.snapToIndex(0)
    }, []);


    Logger.setLogCallback(log => {
        const {message} = log;

        // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
        if (
            message.match('Request failed due to a permanent error: Canceled') ||
            message.match('Request failed due to a permanent error: Socket Closed')
        ) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        handlePresentModalPress()
    }, [])


    return (

        <>
            <ROW style={{position: 'absolute', top: 0, left: 0, zIndex: 999999999999999999, right: 0}}>
                <Layout>
                    <SearchBar/>
                </Layout>
            </ROW>
            <BottomSheetModalProvider>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView
                            rotateEnabled={false}
                            attributionEnabled={false}
                            logoEnabled={false}
                            onRegionDidChange={(region) => setRegion(region)}
                            onDidFinishLoadingStyle={() => setIsLoading(1)}
                            styleURL="mapbox://styles/mapbox/streets-v11"
                            style={{flex: 1, backgroundColor: "gray"}}>

                            <MapboxGL.MarkerView
                                coordinate={[36.28190890771178, 50.01018080226723]}
                                anchor={{x: 36.28190890771178, y: 50.01018080226723}}
                            />


                            {/*<MapboxGL.MarkerView coordinate={[50.525024406131514, 36.484098227681066]}>*/}
                            {/*    <View>*/}
                            {/*        <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619eae68250e16af2c536a14"})}>*/}

                            {/*            <View style={{width:10,height:10,backgroundColor:'red'}} >*/}


                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}

                            {/*    </View>*/}
                            {/*</MapboxGL.MarkerView>*/}
                            {/*<MapboxGL.MarkerView coordinate={[50.262744284410914, 36.23310076191236]}>*/}
                            {/*    <View>*/}
                            {/*        <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619eb2fb572bb75f00c9c38e"})}>*/}

                            {/*            <View style={{width:10,height:10,backgroundColor:'red'}} >*/}

                            {/*            </View>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</MapboxGL.MarkerView>*/}
                            {/*<MapboxGL.MarkerView coordinate={[50.24629542345008, 36.24344300878748]}>*/}
                            {/*    <View>*/}
                            {/*        <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619ebf163a5be9830a1e89ce"})}>*/}

                            {/*            <View style={{width:10,height:10,backgroundColor:'red'}} >*/}

                            {/*            </View>*/}

                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</MapboxGL.MarkerView>*/}
                            {/*<MapboxGL.MarkerView coordinate={[50.480158733298765, 36.450237016788996]}>*/}
                            {/*    <View>*/}
                            {/*        <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619ec4e23a5be9830a1e89d6"})}>*/}

                            {/*            <View style={{width:10,height:10,backgroundColor:'red'}} >*/}

                            {/*            </View>*/}

                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</MapboxGL.MarkerView>*/}
                            {/*<MapboxGL.MarkerView coordinate={[49.96873604989257, 36.08235396406038]}>*/}
                            {/*    <View>*/}
                            {/*        <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619edf4b7b0436d8aeb76930"})}>*/}
                            {/*            <View style={{width:10,height:10,backgroundColor:'red'}} >*/}

                            {/*            </View>*/}

                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</MapboxGL.MarkerView>*/}


                            <MapboxGL.PointAnnotation coordinate={[36.28190890771178, 50.01018080226723]}/>
                            <MapboxGL.UserLocation
                                androidRenderMode={"normal"}
                            />

                            <MapboxGL.Camera
                                animationMode="moveTo"
                                animationDuration={0}
                                zoomLevel={11}
                                centerCoordinate={[-73.935242, 40.730610]}/>
                        </MapboxGL.MapView>
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        enablePanDownToClose={false}
                        enableOverDrag={false}
                        handleHeight={200}
                        topInset={-30}
                        handleComponent={() => <ROW aligncenter justifycenter mb={scale(10)}>
                            <BottomSheetHandle/>
                            <TitleText>
                                3 Location
                            </TitleText>
                        </ROW>
                        }
                    >

                        <TouchableOpacity style={styles.mapBtn} onPress={() => handleSheetChangesPres()}>
                            <MapIcon/>

                            <Text style={{
                                color: '#fff',
                                marginLeft: scale(5),
                                textAlign: 'center',
                            }}>Map</Text>
                        </TouchableOpacity>
                        {classList && (
                            <TouchableOpacity onPress={() => navigation.navigate('CreateForm1')}
                                              style={styles.addCommentBtn}>
                                <AddEvent/>
                            </TouchableOpacity>
                        )}

                        <BottomSheetScrollView >
                            <BottomSheetClasses classList={classList} setClassList={setClassList}/>
                        </BottomSheetScrollView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </>

    );

};

export default MapScreen;

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#0ea960',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        bottom: scale(100),
        right: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },
    mapBtn: {

        backgroundColor: '#002a32',
        position: 'absolute',
        bottom: scale(100),
        left: '50%',
        translateX: -35,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        borderRadius: 50,
        paddingHorizontal: scale(15),
        paddingVertical: scale(10)
    },

    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    contentContainer: {

        backgroundColor: "white",
    },
    dot: {
        width: 10,
        height: 10,

        borderRadius: 25,
        opacity: 1,
    },
    page: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: 'tomato'
    },
    map: {
        flex: 1
    },




});
