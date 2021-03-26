import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import foods from '../../../consts/foods';
import {PrimaryButton} from '../../components/Button';
import BottomSheet from "reanimated-bottom-sheet";
import MapView from "react-native-maps";


const {width, height} = Dimensions.get('screen');

const bottomSheetHeight = height / 3;



const NearbyScreen = ({navigation}) => {
    const CartCard = ({item}) => {
        return (
            <View style={style.cartCard}>
                <Image source={item.image} style={{height: 80, width: 80}} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
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

    const renderContent = () => (
        <View
            style={{
                borderRadius:30,
                backgroundColor: 'white',
                height: bottomSheetHeight,
            }}
        >
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <Icon name='menu' size={40}
                      color={COLORS.primary}/>
            </View>
        </View>
    );

    const sheetRef = React.useRef(0);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Near By</Text>
            </View>
            <MapView style={style.map} />
            <BottomSheet
                // enabledInnerScrolling={true}
                // enabledBottomInitialAnimation={true}
                // enabledBottomClamp={true}
                ref={sheetRef}
                snapPoints={[bottomSheetHeight, 300, 100]}
                borderRadius={10}
                renderContent={renderContent}
            />
            <View style={style.footer}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Near By</Text>
            </View>
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
    footer: {
        flex:1,
        height:200,
        paddingVertical: 20,
        justifyContent:'flex-end',
        marginHorizontal: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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

export default NearbyScreen;
