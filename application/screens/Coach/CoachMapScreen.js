import React, { useEffect, useRef, useMemo, useCallback } from 'react';
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
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TitleText from "../../components/shared/TitleText";
import { AddEvent, LocationIcon, MapIcon } from "../../components/shared/Icons";
import { scale } from "react-native-size-matters";
import BottomSheetClasses from "../Classes/components/BottomSheetClasses";
import CoachList from "./components/CoachList";
import userStore from '../../store/user.store';
import { useMutation } from 'react-query';
import { getCoaches } from '../../services/Api/Coach';
import { observer } from 'mobx-react-lite';

if (Platform.OS === "android") {
    MapboxGL.setWellKnownTileServer("Mapbox")
    MapboxGL.setTelemetryEnabled(false);
}
//MapboxGL.setWellKnownTileServer("Mapbox")
MapboxGL.setAccessToken("pk.eyJ1IjoiYWxheXpoYSIsImEiOiJjamc1b2kwM3MwMDBzMnFsaTl4NnY3ZjRoIn0.-yUx74UjfUfQnWRogmWQ1w");
//MapboxGL.setTelemetryEnabled(false);

const CoachMapScreen = () => {
    const [region, setRegion] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(1)

    const { isLoadingCoaches, mutateAsync, error, isSuccess } = useMutation(['coaches'], () => getCoaches({ latt: region ? region.geometry.coordinates[1] : '33.753746', long: region ? region.geometry.coordinates[0] : '-84.386330', dist: 2000000000 }),)

    const loadCoaches = () => {

        mutateAsync().then(res => {
            userStore.setCoaches(res?.data?.data)
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
                    <SearchBar />
                </Layout>
            </ROW>
            <BottomSheetModalProvider>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapboxGL.MapView
                            rotateEnabled={false}
                            attributionEnabled={false}
                            logoEnabled={false}
                            onRegionDidChange={(region) => { setRegion(region); loadCoaches(); }}
                            onDidFinishLoadingStyle={() => setIsLoading(1)}
                            styleURL="mapbox://styles/mapbox/streets-v11"
                            style={{ flex: 1, backgroundColor: "gray" }}>

                            {userStore.coaches?.map(item => {

                                return (
                                    <>
                                        <MapboxGL.MarkerView coordinate={[parseFloat(item.address.longitude), parseFloat(item.address.latitude)]}>
                                            <View>
                                                <TouchableOpacity onPress={() => navigation.navigate('DeatileScreen', { id: "619ebf163a5be9830a1e89ce" })}>

                                                    <LocationIcon />

                                                </TouchableOpacity>
                                            </View>
                                        </MapboxGL.MarkerView>



                                    </>
                                )
                            })}


                            <MapboxGL.PointAnnotation coordinate={[36.28190890771178, 50.01018080226723]} />
                            <MapboxGL.UserLocation
                                androidRenderMode={"normal"}
                            />

                            <MapboxGL.Camera
                                animationMode="moveTo"
                                animationDuration={0}
                                zoomLevel={11}
                                centerCoordinate={[-73.935242, 40.730610]} />
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
                                {userStore.coaches?.length} Location
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


                        <BottomSheetScrollView>
                            <CoachList List={userStore.coaches.slice()} />
                        </BottomSheetScrollView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </>

    );

};

export default observer(CoachMapScreen);

const styles = StyleSheet.create({

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

    page: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: 'tomato'
    },
});
