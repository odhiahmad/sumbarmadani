import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,ScrollView} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {PrimaryButton} from '../../components/Button';
import nomorPenting from "../../../consts/nomorPenting";
import * as Linking from 'expo-linking';
import axios from "axios";
import {apicorona} from "../../../consts/api";
import LoaderModal from "../../components/LoaderModal";



const CoronaJumlahKasus = ({navigation}) => {

    const [data, setData] = useState({
        data: [],
        loading: false,
    });

    const getIndex = async () => {

        setData({
            ...data,
            loading: true,
        })

        await axios.get(apicorona + "get_corona")
            .then(response => {
                // console.log('getting data from axios', response.data.list_berita);
                setTimeout(() => {

                    setData({
                        ...data,
                        loading: false,
                        data: response.data.result[0]

                    })
                    console.log(data.data)
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

    }, []);


    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <LoaderModal
                loading={data.loading}/>

            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Corona Jumlah Kasus</Text>
            </View>
            <ScrollView>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Positif Rate</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.positif_rate}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Jumlah Spesimen Diperiksa</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.jml_spesimen_diperiksa}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Jumlah Orang Diperiksa</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.jml_orang_diperiksa}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Masih di Rawat</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.masih_dirawat}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Isolasi di Rumah</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.isolasi_dirumah}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Total Suspect</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.total_suspect}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Dirawat</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.dirawat}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Isolasi</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.isolasi}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Isolasi Provinsi</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.isolasi_provinsii}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Isolasi Daerah</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.isolasi_daerah}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Sembuh</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.sembuh}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Meninggal</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.meninggal}
                        </Text>
                    </View>
                </View>
                <View style={style.cartCard}>
                    <Icon name="rate-review" size={70}/>
                    <View style={style.cartInsideCard}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Kasus Positif</Text>
                        <Text style={{fontSize: 18, color: COLORS.grey}}>
                            {data.data.kasus_positif}
                        </Text>
                    </View>
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
    cartInsideCard: {
        height: 80,
        marginLeft: 10,
        paddingVertical: 10,
        flex: 1,
    },
    cartCard: {
        height: 80,
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

export default CoronaJumlahKasus;
