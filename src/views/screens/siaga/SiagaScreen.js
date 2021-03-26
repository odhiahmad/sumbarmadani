import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {PrimaryButton} from '../../components/Button';
import nomorPenting from "../../../consts/nomorPenting";
import * as Linking from 'expo-linking';


const SiagaScreen = ({navigation}) => {

   const makeCall = (number) => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };

    const CartCard = ({item}) => {
        return (
            <View style={style.cartCard}>
                <Image source={item.image} style={{height: 70, width: 70}} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                    <Text style={{fontSize: 18, color: COLORS.grey}}>
                        {item.nomor}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sumbar Siaga</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={nomorPenting}
                renderItem={({item}) => <CartCard item={item} />}
                ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}

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
        height: 80,
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

export default SiagaScreen;
