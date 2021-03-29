import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableHighlight,TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import covids from "../../../consts/covid";

const LawanCoronaScreen = ({navigation}) => {
    const CartCard = ({item}) => {
        return (

            <TouchableOpacity
                // underlayColor={COLORS.white}
                // activeOpacity={0.9}
                onPress={() => navigation.navigate(item.url)}>
                <View style={style.cartCard}>
                    <Icon name={item.icon} size={60} color={COLORS.primary}></Icon>
                    <View
                        style={{
                            height: 100,
                            marginLeft: 10,
                            paddingVertical: 20,
                            flex: 1,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                        <Text style={{fontSize: 13, color: COLORS.grey}}>
                            {item.deskripsi}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lawan Corona</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={covids}
                renderItem={({item}) => <CartCard item={item}/>}
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

export default LawanCoronaScreen;
