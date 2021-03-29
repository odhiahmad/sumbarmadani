import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Dimensions,FlatList,RefreshControl} from 'react-native';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {SecondaryButton} from '../../components/Button';

import moment from "moment";
import HTML from "react-native-render-html";
import axios from "axios";
import {apiPariwisata} from "../../../consts/api";
import LoaderModal from "../../components/LoaderModal";


require('moment/locale/id.js');
const {width, height} = Dimensions.get('screen');
const DetailPariwisataScreen = ({navigation, route}) => {
    const itemPariwisata = route.params;
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

        await axios.get(apiPariwisata + "all_pariwisata?daerah="+itemPariwisata.id_daerah)
            .then(response => {
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        data: response.data.data_pariwisata,
                    })

                   console.log(itemPariwisata)

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
                onPress={() => navigation.navigate('DetailInfoPariwisataScreen', item)}>
                <View style={style.cartCard}>
                        <Image source={{uri:item.cover}} style={{height: '80%', width: '40%'}} />
                    <View
                        style={{
                            height: 70,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{fontSize: 13}}>{item.title}</Text>
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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Detail Pariwisata {itemPariwisata.title}</Text>
            </View>
            {data.data.length === 0 ?
                <View style={{flex:1,alignItems: 'center',
                    justifyContent: 'center',}}>
                    <Text style={{textAlign:'center'}}>Tidak Ada Data Pariwisata</Text>
                </View>:
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

            }

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
        height: 220,
        elevation: 2,
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
        borderRadius: 40,

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

export default DetailPariwisataScreen;
