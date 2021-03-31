import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, ActivityIndicator, RefreshControl, Dimensions} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import foods from '../../../consts/foods';
import {PrimaryButton} from '../../components/Button';
import {apiBerita} from "../../../consts/api";
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

export default function CoronaBerita({navigation}) {

    const [data, setData] = useState({
        data: [],
        id: [],
        cocok: 0,
        loading: false,
        isRefreshing: false,

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

    const onRefresh = async () => {
        setData({
            ...data,
            loading: true,
            isRefreshing: true,
            page: 0
        })

        await axios.get(apiBerita + "json_list_newsUpdate_pagging.php?id_content=0")
            .then(response => {

                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        data: response.data.list_berita,
                        isRefreshing: false
                    })
                }, 2000)
            })
            .catch(error => {
                setData({
                    ...data,
                    loading: false,
                    isRefreshing: false
                })
                console.log(error);
            });
    }

    const getIndex = async () => {
        console.log('Sebelum : ' + data.cocok)
        setData({
            ...data,
            loading: true,
        })

        await axios.get(apiBerita + "json_list_newsUpdate_pagging.php?id_content=" + data.cocok)
            .then(response => {
                // console.log('getting data from axios', response.data.list_berita);
                setTimeout(() => {
                    let listData = data.data;
                    // console.log(response.data.list_berita)
                    setData({
                        ...data,
                        loading: false,
                        data: listData.concat(response.data.list_berita),
                        cocok: data.cocok + 1
                    })

                    // setPage(page+1)
                    console.log('Sesudah :' + data.cocok)
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

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        getIndex()

    }, []);

    const CartCardNews = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('CoronaBeritaDetail', item)}>
                {/*<Image source={item.image} style={{height: 80, width: 80}}/>*/}
                <View style={style.cartCard}>
                    <View
                        style={{
                            height: cardHeightBerita - 10,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{fontSize: 13}}>{item.title_content}</Text>
                        <Text style={{fontSize: 11, color: 'gray'}}>Oleh {item.nama_asn}</Text>
                        <Text style={{
                            fontSize: 11,
                            color: 'gray'
                        }}>{moment(item.created_at).startOf('day').fromNow()}</Text>
                    </View>
                    <View style={{marginRight: 20, alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
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
            {/*<LoaderModal*/}
            {/*    loading={data.loading}/>*/}
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Berita Corona</Text>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={data.isRefreshing}
                        onRefresh={onRefresh.bind(this)}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={data.data}
                renderItem={({item}) => <CartCardNews item={item}/>}
                ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter.bind(this)}
                listKey={(item, index) => index.toString()}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}

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

