import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, ActivityIndicator, RefreshControl, Dimensions} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import foods from '../../../consts/foods';
import {PrimaryButton} from '../../components/Button';
import {apiBerita, apiPariwisata} from "../../../consts/api";
import axios from "axios";
// const axios = require('axios');
import {WebView} from 'react-native-webview';
import LoaderModal from "../../components/LoaderModal";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import moment from 'moment';

require('moment/locale/id.js');
const {width, height} = Dimensions.get('screen');

const cardHeightBerita = height / 5.6;
const cardHeightViewBerita = height / 2 - 30;

export default function PariwisataScreen({navigation}) {

    const [data, setData] = useState({
        data: [],
        id: null,
        loading: false,
        isRefreshing: false,

    });



    const getIndex = async () => {

        setData({
            ...data,
            loading: true,
        })

        await axios.get(apiPariwisata + "banner_daerah")
            .then(response => {
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        data: response.data.daerah,
                    })

                    // setPage(page+1)

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

    const CartCardNews = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailPariwisataScreen', item)}>
                <View style={style.cartCard}>
                    <View
                        style={{
                            height: 60,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{fontSize: 13}}>{item.title}</Text>
                    </View>
                    <View style={{marginRight: 20, alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            textDecorationLine: 'underline',
                            color: COLORS.primary
                        }}>Lihat</Text>
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sumbar Pariwisata</Text>
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
        height: 60,
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

