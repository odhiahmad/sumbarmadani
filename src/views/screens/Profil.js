import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
import {Button} from "react-native-paper";
import {AuthContext} from "../../utils/authContext";
import {apiProfil} from "../../consts/api";

const Profil = ({navigation}) => {
    const [data, setData] = React.useState({
        nama_asn: '',
        username: '',
        jabatan: '',
        isError: false,
        refreshing: false,
        isLoading: true,
        average: '',
        average_color: '',
        jumlah_telat: '',
        jam_telat: '',
        average_percent: '',
        pulang_cepat: '',
        durasi: [],

    });

    useEffect(() => {
        feedData();
    }, []);

    const _onRefresh = () => {
        setData({
            ...data,
            refreshing: true,
            isError: false,
        });

        feedData().then(() => {
            setData({
                ...data,
                refreshing: false,
            });
        });
    }
    const feedData = async () => {
        const token = await AsyncStorage.getItem('username');
        const nama_asn = await AsyncStorage.getItem('nama_asn');
        const jabatan = await AsyncStorage.getItem('jabatan');

        setData({
            ...data,
            nama_asn:nama_asn,
            jabatan:jabatan
        })
    }

    const {signOut} = useContext(AuthContext);
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Profile</Text>
            </View>
            <ScrollView
                style={style.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                <View style={style.cartProfil}>
                    <Icon name="account-circle" color={COLORS.primary} size={120}/>

                    <Text style={style.userName}>{data.nama_asn}</Text>
                    <Text style={style.aboutUser}>
                        {data.jabatan}
                    </Text>
                    <Button icon="camera" onPress={() => signOut()} mode="contained"
                            style={{backgroundColor: COLORS.primary}}>
                        Logout
                    </Button>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    cartProfil: {
        width: '98%',
        height: 420,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 3,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cartProfilFooter: {
        width: '98%',
        height: 180,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 3,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        // flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Profil;
