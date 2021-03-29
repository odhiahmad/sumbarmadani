import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {PrimaryButton} from '../../components/Button';
import nomorPenting from "../../../consts/nomorPenting";
import * as Linking from 'expo-linking';
import axios from "axios";
import {apicorona} from "../../../consts/api";
import LoaderModal from "../../components/LoaderModal";


const CoronaPetunjukTeknis = ({navigation}) => {

    const [data, setData] = useState({
        data: [],
        loading: false,
    });

    const getIndex = async () => {

        setData({
            ...data,
            loading: true,
        })

        await axios.get(apicorona + "get_petunjuk_teknis")
            .then(response => {
                // console.log('getting data from axios', response.data.list_berita);
                setTimeout(() => {

                    setData({
                        ...data,
                        loading: false,
                        data: response.data.result

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


    const CartCard = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
            >
                <View style={style.cartCard}>
                    <Image source={{uri:item.result[0].gambar}} style={{height: '67%', width: '22%'}} />
                    <View
                        style={{
                            height: 120,
                            marginLeft: 10,
                            paddingVertical: 10,
                            flex: 1,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.Kategori}</Text>
                        <Text style={{fontSize: 15, color: COLORS.grey}}>
                            {item.result[0].judul}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <LoaderModal
                loading={data.loading}/>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Corona Petunjuk Teknis</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={data.data}
                renderItem={({item}) => <CartCard item={item}/>}
                ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
                listKey={(item, index) => index.toString()}
                keyExtractor={(item, index) => index.toString()}

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
    cartCard: {
        height: 120,
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

export default CoronaPetunjukTeknis;
