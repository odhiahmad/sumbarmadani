import React, {useEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import {TextInput} from "react-native-paper";
import {PrimaryButton} from "../../../components/Button";
import * as Location from 'expo-location';
import LoaderModal from "../../../components/LoaderModal";
import {apiBencanaTerban} from "../../../../consts/api";

const TanahLongsorTambahScreen = ({navigation, route}) => {
    const item = route.params;

    const [data, setData] = useState({
        data: [],
        loading: false,

        nama: '',
        no_hp: '',
        judul: '',
        jenis: '',
        tipe: 'F',
        sumber: 'Langsung di TKP',
        create_ip: 'Android',
        id_status: '2',
        penanganan: '0',
        pesan: '',
        alamat: '',

        provinsi: '',
        kota: '',
        kecamatan: '',
        lat: 0,
        long: 0,
        lokasi: '',
        gambar: item.source.base64,
        file_ext: '.jpeg',


    });

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
                            lokasi: res[0].street,
                            alamat: res[0].region + ', ' + res[0].subregion + ', ' + res[0].district + ', ' + res[0].street
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

    const _onSubmit = () => {


        console.log({
            image: data.gambar,
            jenis: 'L',
            nm_jenis: 'Longsor',
            tipe: 'F',
            judul: data.judul,
            latitude: data.lat,
            longitude: data.long,
            telp: data.no_hp,
            alamat: data.alamat,
            keterangan: data.pesan,
            sumber: 'Langsung di TKP',
            create_by: '',
            create_ip: 'Android',
            id_status: '2',
            penanganan: '0',

        })
        if (data.nama !== '' && data.no_hp !== '') {
            setData({
                ...data,
                loading: true,
            });
            fetch(apiBencanaTerban + 'insertPengaduanLive', {
                method: 'POST',
                // headers: {
                //     Accept: '*/*',
                //     'Content-Type': 'application/x-www-form-urlencoded',
                // },
                body: JSON.stringify({
                    image: data.gambar,
                    jenis: 'L',
                    nm_jenis: 'Longsor',
                    tipe: 'F',
                    judul: data.judul,
                    latitude: data.lat,
                    longitude: data.long,
                    telp: data.no_hp,
                    alamat: data.alamat,
                    keterangan: data.pesan,
                    sumber: 'Langsung di TKP',
                    create_by: '',
                    create_ip: 'Android',
                    id_status: '2',
                    penanganan: '0',

                }),
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson)

                navigation.popToTop();
                Alert.alert(
                    "Notifikasi",
                    "Berhasil menginputkan data laporan",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ],
                    {cancelable: false}
                );


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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Laporkan Tanah Longsor</Text>
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
                        label="Judul"
                        maxLength={12}
                        theme={{
                            colors: {
                                placeholder: COLORS.primary,
                                text: COLORS.primary,
                                primary: COLORS.primary,
                                underlineColor: 'transparent',
                                background: '#fff'
                            }
                        }}
                        value={data.judul}
                        onChangeText={text => setData({
                            ...data,
                            judul: text
                        })}
                    />
                    <TextInput
                        mode='outlined'
                        label="Keterangan"
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
                    <TextInput
                        mode='outlined'
                        label="Alamat"
                        theme={{
                            colors: {
                                placeholder: COLORS.primary,
                                text: COLORS.primary,
                                primary: COLORS.primary,
                                underlineColor: 'transparent',
                                background: '#fff'
                            }
                        }}
                        value={data.alamat}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => setData({
                            ...data,
                            alamat: text
                        })}
                    />

                    <View
                        style={{
                            marginVertical: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 260,
                        }}>
                        <Image source={{uri: item.source.uri}} style={{height: '100%', width: '100%'}}/>
                    </View>


                </View>
                <View style={{
                    marginTop: 10,
                    marginBottom: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <PrimaryButton title="Submit" onPress={_onSubmit}/>
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

export default TanahLongsorTambahScreen;
