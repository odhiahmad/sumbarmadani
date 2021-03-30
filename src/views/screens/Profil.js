import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';

const Profil = ({navigation}) => {
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
                <Image
                    style={style.userImg}
                    source={{uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                />
                <Text style={style.userName}>Tes</Text>
                <Text style={style.aboutUser}>
                    No details added
                </Text>
                <View style={style.userBtnWrapper}>
                    <TouchableOpacity style={style.userBtn}>
                        <Text style={style.userBtnTxt}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.userBtn}>
                        <Text style={style.userBtnTxt}>Follow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.userBtn}>
                        <Text style={style.userBtnTxt}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.userBtn}>
                        <Text style={style.userBtnTxt}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.userInfoWrapper}>
                    <View style={style.userInfoItem}>
                        <Text style={style.userInfoTitle}>2323</Text>
                        <Text style={style.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={style.userInfoItem}>
                        <Text style={style.userInfoTitle}>10,000</Text>
                        <Text style={style.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={style.userInfoItem}>
                        <Text style={style.userInfoTitle}>100</Text>
                        <Text style={style.userInfoSubTitle}>Following</Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
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
    userBtnWrapper: {
        elevation: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,

    },
    userInfoItem: {
        height: 100,
        elevation: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default Profil;
