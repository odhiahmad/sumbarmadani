import React,{useEffect,useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, ActivityIndicator,RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import foods from '../../../consts/foods';
import {PrimaryButton} from '../../components/Button';
import {apiBerita} from "../../../consts/api";
import axios from "axios";
// const axios = require('axios');
import { WebView } from 'react-native-webview';
import LoaderModal from "../../components/LoaderModal";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const NewsScreen = ({navigation}) => {

    const [data, setData] = useState({
        data: [],
        id:[],
        loading: false,
        isRefreshing: false,

    });

    const [page,setPage] = useState(1)

    const handleLoadMore = () => {

        if (!data.loading) {
            const a = setPage(page+1)
            console.log(a)
           getIndex(page+1)
        }
    };

    const renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!data.loading) return null;
        return (
            <ActivityIndicator
                size="small"
                color={COLORS.primary}
                animating={true} />
        );
    };

    const onRefresh = async () => {
        setData({
            ...data,
            loading: true,
            isRefreshing:true,
            page:0
        })

        await axios.get(apiBerita+"json_list_newsUpdate_pagging.php?id_content=0")
            .then(response => {
                console.log('getting data from axios', response.data.list_berita);
                setTimeout(() => {
                    setData({
                        ...data,
                        loading: false,
                        data: response.data.list_berita,
                        isRefreshing:false
                    })
                }, 2000)
            })
            .catch(error => {
                setData({
                    ...data,
                    loading: false,
                    isRefreshing:false
                })
                console.log(error);
            });
    }

    const getIndex = async (tes) => {

        setData({
            ...data,
            loading: true,
        })

        await axios.get(apiBerita+"json_list_newsUpdate_pagging.php?id_content="+tes)
            .then(response => {
                // console.log('getting data from axios', response.data.list_berita);
                setTimeout(() => {
                    let listData = data.data;
                    setData({
                        ...data,
                        loading: false,
                        data: listData.concat(response.data.list_berita)
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

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        getIndex(0)

    }, []);

    const CartCard = ({item}) => {
        return (
            <View style={style.cartCard}>
                <Image source={item.image} style={{height: 80, width: 80}}/>
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.created}</Text>
                    <Text style={{fontSize: 13, color: COLORS.grey}}>
                        {item.ingredients}
                    </Text>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
                </View>
                <View style={{marginRight: 20, alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>
                    {/*<View style={style.actionBtn}>*/}
                    {/*  <Icon name="remove" size={25} color={COLORS.white} />*/}
                    {/*  <Icon name="add" size={25} color={COLORS.white} />*/}
                    {/*</View>*/}
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            {/*<LoaderModal*/}
            {/*    loading={data.loading}/>*/}
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sumbar News</Text>
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
                renderItem={({item}) => <CartCard item={item}/>}
                ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter.bind(this)}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore.bind(this)}

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
        height: 100,
        elevation: 15,
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

export default NewsScreen;
