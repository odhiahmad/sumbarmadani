import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, RefreshControl, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import BottomSheet from "reanimated-bottom-sheet";
import MapView, {Marker} from "react-native-maps";
import {Button} from "react-native-paper";
import {FlatList, TouchableHighlight} from "react-native-gesture-handler";
import axios from "axios";
import {apiBencanaBanjir} from "../../../../consts/api";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import LoaderModal from "../../../components/LoaderModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const bottomSheetHeight = height / 1.3;


const cardHeightBerita = height / 5.6;

const KebakaranScreen = ({navigation}) => {

    const [data, setData] = useState({
        data: [],
        id: [],
        loading: false,
        isRefreshing: false,
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        eselon: 0


    });

    const [page, setPage] = useState(0)

    const handleLoadMore = () => {

        if (!data.loading) {
            getIndex()
        }
    };

    // useEffect(() => {
    //     handleLoadMore()
    // });

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!data.loading) return null;
        return (
            <ActivityIndicator
                size="small"
                color={COLORS.primary}
                animating={true}/>
        );
    };

    const _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setData({
                ...data,
                locationResult: 'Permission to access location was denied',
            });
        } else {
            setData({
                ...data, hasLocationPermissions: true
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        setData({
            ...data, locationResult: JSON.stringify(location)
        });

        // Center the map on the location we just fetched.
        setData({
            ...data,
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.1922,
                longitudeDelta: 0.1421
            }
        });
    };


    const getIndex = async () => {
        const eselon = await AsyncStorage.getItem('group');


        setData({
            ...data,
            loading: true,
            eselon: eselon
        });

        console.log(data.eselon);

        await axios.get(apiBencanaBanjir + 'informasi_bencana')
            .then(response => {
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        data: response.data.result,
                    })
                }, 2000)
            })
            .catch(error => {
                setData({
                    ...data,
                    loading: false,
                })
                console.log(error);
            });
    }


    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        getIndex()
        _getLocationAsync()

    }, []);

    const CartCardNews = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsNewsScreen', item)}>
                {/*<Image source={item.image} style={{height: 80, width: 80}}/>*/}
                <View style={style.cartCard}>
                    <View
                        style={{
                            height: cardHeightBerita - 10,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{fontSize: 13}}>{item.nm_kabkota}</Text>
                        <Text style={{fontSize: 11, color: 'gray', marginTop: 5}}>{item.alamat_bencana}</Text>

                        {/*<Text style={{*/}
                        {/*    marginTop: 5,*/}
                        {/*    fontSize: 11,*/}
                        {/*    color: 'gray'*/}
                        {/*}}>*/}
                        {/*    /!*<Icon name='date-range' size={11}*!/*/}
                        {/*    /!*      color={COLORS.primary}/>*!/*/}
                        {/*    {moment(item.created_date).startOf('day').fromNow()}</Text>*/}
                    </View>


                    <View style={{marginRight: 20, alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            textDecorationLine: 'underline',
                            color: COLORS.primary
                        }}>Kirim Pesan</Text>
                    </View>


                </View>
            </TouchableHighlight>
        );
    };

    const openTab = () => {
        navigation.navigate('KebakaranKamerascreen')
    }
    const renderContent = () => (
        <View
            style={{
                borderRadius: 30,
                backgroundColor: 'white',
                height: bottomSheetHeight,
            }}
        >
            <View style={{alignItems: 'center', marginTop: 5}}>
                <Button icon="camera" mode="contained" onPress={openTab} style={{backgroundColor: COLORS.primary}}>
                    Laporkan
                </Button>

            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={data.isRefreshing}
                        onRefresh={getIndex}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={data.data}
                renderItem={({item}) => <CartCardNews item={item}/>}
                listKey={(item, index) => index.toString()}
                keyExtractor={(item, index) => index.toString()}
                // onEndReachedThreshold={0.4}
                // onEndReached={handleLoadMore}
            />
        </View>
    );

    const sheetRef = React.useRef(0);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <LoaderModal
                loading={data.loading}/>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Kebakaran</Text>
            </View>
            {data.data.length === 0 ? <View></View> :
                <MapView
                    // onLayout={onMapReady}
                    style={style.map}
                    region={data.mapRegion}
                >
                    {data.data.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                            }}
                            title={marker.nm_kabkota}
                            description={marker.alamat_bencana}
                        />
                    ))}
                </MapView>
            }

            <BottomSheet
                // enabledInnerScrolling={true}
                // enabledBottomInitialAnimation={true}
                // enabledBottomClamp={true}
                enabledContentTapInteraction={false}
                ref={sheetRef}
                snapPoints={[bottomSheetHeight - 40, 300, 200]}
                borderRadius={10}
                renderContent={renderContent}
            />
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    footer: {
        flex: 1,
        height: 200,
        paddingVertical: 20,
        justifyContent: 'flex-end',
        marginHorizontal: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cartCard: {
        height: cardHeightBerita,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default KebakaranScreen;
