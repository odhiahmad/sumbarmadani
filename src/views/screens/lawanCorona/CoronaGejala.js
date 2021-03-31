import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FlatList, ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import axios from "axios";
import {apiBerita, apicorona} from "../../../consts/api";
import LoaderModal from "../../components/LoaderModal";
import {SecondaryButton} from "../../components/Button";


const CoronaGejala = ({navigation}) => {

    const [data, setData] = useState({
        data: [],
        loading: false,
    });

    const getIndex = async () => {

        setData({
            ...data,
            loading: true,
        })

        await axios.get(apicorona + "get_informasi_gejala")
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Corona Gejala</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{fontSize: 22, fontWeight: 'bold', color: COLORS.white}}>
                            {data.data.judul_info}
                        </Text>
                    </View>
                    <Text style={style.detailsText}>
                        {data.data.how}
                    </Text>
                    <Text style={style.detailsText}>
                         {data.data.how_ket}
                    </Text>
                    <Text style={style.detailsText}>
                        {data.data.what}
                    </Text>
                    <Text style={style.detailsText}>
                        {data.data.what_ket}
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 560,
                    }}>
                    <Image source={{uri:data.data.picture}} style={{height: '100%', width: '100%'}} />
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
    cartCard: {
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
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

export default CoronaGejala;
