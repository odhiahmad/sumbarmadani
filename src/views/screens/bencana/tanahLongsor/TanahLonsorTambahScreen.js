import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import {PrimaryButton, SecondaryButton} from '../../../components/Button';
import HTML from "react-native-render-html";
import {TextInput} from "react-native-paper";
const TanahLongsorTambahScreen = ({navigation, route}) => {
    const item = route.params;

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Laporkan Kebakaran</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
                <View>

                    <TextInput
                        mode='outlined'
                        label="Email"
                        theme={{ colors: { placeholder: COLORS.primary, text: COLORS.primary, primary: COLORS.primary,underlineColor:'transparent',background : '#fff'}}}
                        // value={text}
                        // onChangeText={text => setText(text)}
                    />



                </View>
                <View style={{marginTop: 20,width: '100%',alignItems:'center',justifyContent: 'center'}}>
                    <PrimaryButton title="Laporkan Kebakaran"/>
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

export default TanahLongsorTambahScreen;
