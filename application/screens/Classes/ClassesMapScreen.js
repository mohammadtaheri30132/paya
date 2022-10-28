import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from "react-native";
import MapboxGL, {Logger} from '@rnmapbox/maps';
import {scale} from 'react-native-size-matters';
import {
    BottomSheetHandle,
    BottomSheetModal,
    BottomSheetModalProvider, BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import ROW from "../../components/shared/ROW";
import {AddEvent, LocationIcon, MapIcon} from "../../components/shared/Icons";
import BottomSheetClasses from "./components/BottomSheetClasses";
import SearchBar from "../../components/shared/SearchBar";
import Layout from "../../components/shared/Layout";
import TitleText from "../../components/shared/TitleText";
import SubText from "../../components/shared/SubText";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getEvents} from "../../services/Api/Event";
import LoadingScreen from "../../components/shared/LoadingScreen";
import ErrorInternet from "../../components/shared/ErrorInternet";
import UserStore from "../../store/user.store";

//config map box
if(Platform.OS === "android"){
    MapboxGL.setWellKnownTileServer("Mapbox")
    MapboxGL.setTelemetryEnabled(false);
}

MapboxGL.setAccessToken("pk.eyJ1IjoiYWxheXpoYSIsImEiOiJjamc1b2kwM3MwMDBzMnFsaTl4NnY3ZjRoIn0.-yUx74UjfUfQnWRogmWQ1w");



const MapScreen = ({navigation}) => {
    const [region, setRegion] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(1)
    const [classList, setClassList] = React.useState(false)
    //const [events,setEvents] = useState([])

    const {isLoadingEvents, mutateAsync,error,isSuccess} = useMutation('events',()=>getEvents({latt:region?region.geometry.coordinates[1]:'33.753746',long:region?region.geometry.coordinates[0]:'-84.386330',dist:2000000000,sb:'adrs.city'}), )



    const loadEvents = () => {

            mutateAsync().then(res=>{
                UserStore.setEvents(res?.data?.data)
            })


        //setEvents(dd?.data?.data)
        //console.log("events",dd.data.data)
    }

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => [140, '90%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        //loadEvents()
    }, []);
    const handleSheetChangesPres = useCallback((index) => {
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
                            onRegionDidChange={(region) => {setRegion(region);loadEvents();}}
                            onDidFinishLoadingStyle={() => setIsLoading(1)}
                            styleURL="mapbox://styles/mapbox/streets-v11"
                            style={{flex: 1, backgroundColor: "gray"}}>

                            {UserStore.events?.map(item=>
                            {

                                return (
                                <>
                                    <MapboxGL.MarkerView coordinate={[parseFloat(item.facility.address.longitude), parseFloat(item.facility.address.latitude)]}>
                                            <View>
                                                <TouchableOpacity onPress={()=>navigation.navigate('DeatileScreen',{id:"619ebf163a5be9830a1e89ce"})}>

                                                    <LocationIcon/>

                                                </TouchableOpacity>
                                            </View>
                                    </MapboxGL.MarkerView>



                                </>
                            )})}

                            <MapboxGL.UserLocation
                                androidRenderMode={"normal"}
                            />





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
                                {UserStore.events?.length} Location
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
        backgroundColor: '#002a32',
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

    touchableContainer: { borderColor: 'black', borderWidth: 1.0, width: 60 },
    touchable: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableText: {
        color: 'white',
        fontWeight: 'bold',
    },


});
