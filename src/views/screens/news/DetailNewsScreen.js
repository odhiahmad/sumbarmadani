import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {SecondaryButton} from '../../components/Button';

import moment from "moment";
import HTML from "react-native-render-html";

require('moment/locale/id.js');
const {width, height} = Dimensions.get('screen');
const DetailsNewsScreen = ({navigation, route}) => {
    const item = route.params;

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 180,
                    }}>
                    {/*<Image source={item.image} style={{height: 220, width: 220}} />*/}
                </View>
                <View style={style.details}>
                    <View>
                        <Text
                            style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white}}>
                            {item.title_content}
                        </Text>
                        <Text style={{fontSize: 11, color: COLORS.white}}>Oleh {item.nama_asn}</Text>
                        <Text style={{
                            fontSize: 11, color: COLORS.white
                        }}>{moment(item.created_at).startOf('day').fromNow()}</Text>
                    </View>
                </View>
                <View style={{padding:10}}>
                    <HTML source={{html: item.detail}}
                          contentWidth={width}/>
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

export default DetailsNewsScreen;
