import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import Layout from "../../components/shared/Layout";
import MapboxGL, { Logger } from "@rnmapbox/maps";
import ROW from "../../components/shared/ROW";
import SearchBar from "../../components/shared/SearchBar";
import {
    BottomSheetHandle,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { ActivityIndicator, Dimensions, PixelRatio, Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import TitleText from "../../components/shared/TitleText";
import { AddEvent, LocationIcon, MapIcon } from "../../components/shared/Icons";
import { scale } from "react-native-size-matters";
import BottomSheetClasses from "../Classes/components/BottomSheetClasses";
import userStore from '../../store/user.store';
import { useMutation } from 'react-query';
import { observer } from 'mobx-react-lite';
import CourtList from './components/CourtList';
import { getCourts } from '../../services/Api/Court';

if (Platform.OS === "android") {
    MapboxGL.setWellKnownTileServer("Mapbox")
    MapboxGL.setTelemetryEnabled(false);
}
//MapboxGL.setWellKnownTileServer("Mapbox")
MapboxGL.setAccessToken("pk.eyJ1IjoiYWxheXpoYSIsImEiOiJjamc1b2kwM3MwMDBzMnFsaTl4NnY3ZjRoIn0.-yUx74UjfUfQnWRogmWQ1w");
//MapboxGL.setTelemetryEnabled(false);

const CourtMapScreen = ({ navigation }) => {
    const [region, setRegion] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(1)

    const width = useWindowDimensions().width
    //const width = PixelRatio.getPixelSizeForLayoutSize(width2)

    const mapref = useRef(null);

    const zoom = [
        { level: 0, dist: (78271.484 * width) / 1000, width: width },
        { level: 1, dist: (39135.742 * width) / 1000, width: width },
        { level: 2, dist: (19567.871 * width) / 1000, width: width },
        { level: 3, dist: (9783.936 * width) / 1000, width: width },
        { level: 4, dist: (4891.968 * width) / 1000, width: width },
        { level: 5, dist: (2445.984 * width) / 1000, width: width },
        { level: 6, dist: (1222.992 * width) / 1000, width: width },
        { level: 7, dist: (611.496 * width) / 1000, width: width },
        { level: 8, dist: (305.748 * width) / 1000, width: width },
        { level: 9, dist: (152.874 * width) / 1000, width: width },
        { level: 10, dist: (76.437 * width) / 1000, width: width },
        { level: 11, dist: (38.218 * width) / 1000, width: width },
        { level: 12, dist: (19.109 * width) / 1000, width: width },
        { level: 13, dist: (9.555 * width) / 1000, width: width },
        { level: 14, dist: (4.777 * width) / 1000, width: width },
        { level: 15, dist: (2.389 * width) / 1000, width: width },
        { level: 16, dist: (1.194 * width) / 1000, width: width },
        { level: 17, dist: (0.597 * width) / 1000, width: width },
        { level: 18, dist: (0.299 * width) / 1000, width: width },
        { level: 19, dist: (0.149 * width) / 1000, width: width },
        { level: 20, dist: (0.075 * width) / 1000, width: width },
        { level: 21, dist: (0.037 * width) / 1000, width: width },
        { level: 22, dist: (0.019 * width) / 1000, width: width },
    ]

    const [zoomLevel, setZoomLevel] = useState(13)
    const [dist, setDist] = useState(0)

    useEffect(() => {
        let zo = Math.round(zoomLevel)
        let dist2 = zoom[zo]

        setDist(dist2.dist)
    }, [zoomLevel])

    async function getZoomLevel() {
        const zoom = await mapref.current.getZoom();
        setZoomLevel(zoom)
    }

    const { isLoading: isLoadingCourt, mutateAsync, error, isSuccess } = useMutation(() => getCourts({ latt: region ? region.geometry.coordinates[1] : userStore.userLocation.latitude, long: region ? region.geometry.coordinates[0] : userStore.userLocation.longitude, dist: dist/2 }),)

    const loadCourts = () => {
        if (!isLoadingCourt) {
            mutateAsync().then(res => {
                userStore.setCourts(res?.data?.data)
            })
        }



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
    }, []);
    const handleSheetChangesPres = useCallback((index) => {
        bottomSheetModalRef.current?.snapToIndex(0)
    }, []);



    Logger.setLogCallback(log => {
        const { message } = log;

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
            <ROW style={{ position: 'absolute', top: 0, left: 0, zIndex: 999999999999999999, right: 0 }}>
                <Layout>
                    <SearchBar mapref={mapref} />
                </Layout>
            </ROW>
            <TouchableOpacity onPress={() => navigation.navigate('AddCourtScreen')} style={styles.addCommentBtn}>
                <AddEvent />
            </TouchableOpacity>
            <BottomSheetModalProvider>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView
                            ref={mapref}
                            rotateEnabled={false}
                            attributionEnabled={false}
                            logoEnabled={false}
                            zoomEnabled={true}
                            onRegionDidChange={(region) => { getZoomLevel(); setRegion(region);console.log(region); loadCourts(); }}
                            onDidFinishLoadingStyle={() => setIsLoading(1)}
                            styleURL="mapbox://styles/mapbox/streets-v11"
                            style={{ flex: 1, backgroundColor: "gray" }}>

                            {userStore.coordinates?.map(item => {
                                let lng = parseFloat(item[1]);
                                let lat = parseFloat(item[2]);
                                let coord = [lng,lat]
                                return (
                                    <MapboxGL.MarkerView key={item[0]} id={item[0]} coordinate={coord}>
                                        <>
                                            <Text>{item[0]}</Text>
                                            <LocationIcon />
                                        </>
                                    </MapboxGL.MarkerView>
                                )
                            })}


                            <MapboxGL.UserLocation
                                androidRenderMode={"normal"}
                            />

                            <MapboxGL.Camera
                                animationMode="flyTo"
                                animationDuration={2500}
                                zoomLevel={13}
                                centerCoordinate={userStore.centerMap} />
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
                            <BottomSheetHandle />
                            <TitleText>
                                {userStore.courts?.length} Location
                            </TitleText>
                        </ROW>
                        }
                    >

                        <TouchableOpacity style={styles.mapBtn} onPress={() => handleSheetChangesPres()}>
                            <MapIcon />
                            <Text style={{
                                color: '#fff',
                                marginLeft: scale(5),
                                textAlign: 'center',
                            }}>Map</Text>
                        </TouchableOpacity>


                        <BottomSheetScrollView horizontal nestedScrollEnabled scrollEnabled={false} >
                            {isLoadingCourt ?
                                <ActivityIndicator size={'large'} color='orange' />
                                :
                                <CourtList List={userStore.courts.slice()} />
                            }
                        </BottomSheetScrollView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </>

    );

};

export default observer(CourtMapScreen);

const styles = StyleSheet.create({
    addCommentBtn: {
        position: 'absolute',
        backgroundColor: '#002a32',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderRadius: 10,
        right: scale(20),
        bottom: scale(80),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
    },
    mapBtn: {

        backgroundColor: '#002a32',
        position: 'absolute',
        bottom: scale(100),
        left: '50%',
        marginLeft: -35,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 9999,
        borderRadius: 50,
        paddingHorizontal: scale(15),
        paddingVertical: scale(10)
    },

    page: {
        marginTop: 120,
        marginBottom: 140,
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    container: {
        flex: 1,
        backgroundColor: 'tomato'
    },
});
