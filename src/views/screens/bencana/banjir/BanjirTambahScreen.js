import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import {Button, RadioButton, TextInput} from "react-native-paper";
import {PrimaryButton} from "../../../components/Button";
import * as Location from 'expo-location';
import LoaderModal from "../../../components/LoaderModal";
import {apiBencanaKebakaran} from "../../../../consts/api";
import * as ImagePicker from 'expo-image-picker';

const BanjirTambahScreen = ({navigation}) => {


    const [data, setData] = useState({
        data: [],
        loading: false,

        nama: '',
        no_hp: '',

        jenis_bencana: '',
        nm_sungai: '',

        kabupaten: '',
        kelurahan: '',
        alamat_bencana: '',
        penyebab_bencana: '',
        deskripsi: '',


        pesan: '',

        provinsi: '',
        kota: '',
        kecamatan: '',
        lat: 0,
        long: 0,
        lokasi: '',
        gambar: '',
        file_ext: '',
        uri: '',
    });

    const [checked, setChecked] = React.useState('first');

    const getLocation = async () => {
        // setData({
        //     ...data,
        //     loading: true,
        // });
        Location.requestPermissionsAsync().then((permission) => {
            if (permission.status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                Location.getCurrentPositionAsync().then((pos) => {
                    Location.reverseGeocodeAsync({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }).then((res) => {

                        setData({
                            ...data,
                            // loading: false,
                            provinsi: res[0].region,
                            kota: res[0].subregion,
                            kecamatan: res[0].district,
                            lat: pos.coords.latitude,
                            long: pos.coords.longitude,
                            lokasi: res[0].street
                        });


                        console.log({
                            res
                        })

                        // e.g. Canada, United States
                    });
                });
            }
        });


    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });


        if (!result.cancelled) {

            let uri = result.uri;
            let fileExtension = uri.substr(uri.lastIndexOf('.') + 1);
            setData({
                ...data,
                gambar: result.base64,
                file_ext: fileExtension,
                uri: result.uri
            })

        }
    };

    const _onSubmit = () => {


        if (data.nama !== '' && data.no_hp !== '') {
            setData({
                ...data,
                loading: true,
            });
            fetch(apiBencanaKebakaran + 'kebakaran', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    nama: data.nama,
                    no_hp: data.no_hp,
                    file: data.gambar,
                    pesan: data.pesan,
                    file_ext: data.file_ext,
                    provinsi: data.provinsi,
                    kabupaten: data.kota,
                    kecamatan: data.kecamatan,
                    lat: data.lat,
                    lng: data.long,
                    lokasi: data.lokasi

                }),
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status === true) {
                    navigation.popToTop();
                    Alert.alert(
                        "Notifikasi",
                        "Berhasil menginputkan data laporan",
                        [
                            {text: "OK", onPress: () => console.log("OK Pressed")}
                        ],
                        {cancelable: false}
                    );
                } else {
                    console.log(responseJson)
                    setData({
                        ...data,
                        loading: false,

                    });
                    Alert.alert(
                        "Notifikasi",
                        "Gagal",
                        [
                            {text: "OK"}
                        ],
                        {cancelable: false}
                    );

                }


            }).catch((error) => {
                console.log(error)
                setData({
                    ...data,
                    loading: false,
                });

                Alert.alert(
                    "Notifikasi",
                    "Gagal",
                    [
                        {text: "OK"}
                    ],
                    {cancelable: false}
                );
            });
        } else {

            Alert.alert(
                "Notifikasi",
                "Isi Semua Data Dengan Benar",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: false}
            );


        }

    }


    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        getLocation()

    }, []);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <LoaderModal
                loading={data.loading}/>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Laporkan Banjir</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
                <View>
                    {data.lokasi !== '' ?
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Icon name="location-on" size={16} color={COLORS.primary}/>
                            <Text
                                style={{fontSize: 18, fontWeight: 'bold', color: COLORS.primary}}>
                                {data.provinsi}, {data.kota}, {data.kecamatan}, {data.lokasi}
                            </Text>
                        </View> :
                        <View></View>
                    }

                    <TextInput
                        mode='outlined'
                        label="Nama"
                        autoCapitalize='words'
                        theme={{
                            colors: {
                                placeholder: COLORS.primary,
                                text: COLORS.primary,
                                primary: COLORS.primary,
                                underlineColor: 'transparent',
                                background: '#fff'
                            }
                        }}
                        value={data.nama}
                        onChangeText={text => setData({
                            ...data,
                            nama: text
                        })}
                    />
                    <TextInput
                        mode='outlined'
                        label="No HP"
                        maxLength={12}
                        keyboardType={"numeric"}
                        theme={{
                            colors: {
                                placeholder: COLORS.primary,
                                text: COLORS.primary,
                                primary: COLORS.primary,
                                underlineColor: 'transparent',
                                background: '#fff'
                            }
                        }}
                        value={data.no_hp}
                        onChangeText={text => setData({
                            ...data,
                            no_hp: text
                        })}
                    />
                    <TextInput
                        mode='outlined'
                        label="Pesan"
                        theme={{
                            colors: {
                                placeholder: COLORS.primary,
                                text: COLORS.primary,
                                primary: COLORS.primary,
                                underlineColor: 'transparent',
                                background: '#fff'
                            }
                        }}
                        value={data.pesan}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => setData({
                            ...data,
                            pesan: text
                        })}
                    />
                    <View>
                        <RadioButton.Item
                            label="First item"
                            theme={{
                                colors: {
                                    placeholder: COLORS.primary,
                                    text: COLORS.primary,
                                    primary: COLORS.primary,
                                    underlineColor: 'transparent',
                                    background: '#fff'
                                }
                            }}
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <RadioButton.Item
                            label="First item"
                            theme={{
                                colors: {
                                    placeholder: COLORS.primary,
                                    text: COLORS.primary,
                                    primary: COLORS.primary,
                                    underlineColor: 'transparent',
                                    background: '#fff'
                                }
                            }}
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                    </View>

                    <Button icon="camera" theme={{
                        colors: {
                            placeholder: COLORS.primary,
                            text: COLORS.primary,
                            primary: COLORS.primary,
                            underlineColor: 'transparent',
                            background: '#fff'
                        }
                    }} mode="outlined" style={{marginTop: 10}} onPress={() => pickImage()}>
                        Upload Foto
                    </Button>

                    {data.uri === '' ? <View></View> : <View
                        style={{
                            marginVertical: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 260,
                        }}>
                        <Image source={{uri: data.uri}} style={{height: '100%', width: '100%'}}/>
                    </View>

                    }

                </View>
                <View style={{
                    marginTop: 10,
                    marginBottom: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <PrimaryButton title="Laporkan Kebakaran" onPress={_onSubmit}/>
                </View>
            </ScrollView>
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
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: COLORS.white,
    },
});

export default BanjirTambahScreen;
