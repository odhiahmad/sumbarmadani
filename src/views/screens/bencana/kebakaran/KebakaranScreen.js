import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import {PrimaryButton} from '../../../components/Button';
import BottomSheet from "reanimated-bottom-sheet";
import MapView from "react-native-maps";
import {Button} from "react-native-paper";


const {width, height} = Dimensions.get('screen');

const bottomSheetHeight = height / 1.3;


const KebakaranScreen = ({navigation}) => {

    const openTab = () => {
        navigation.navigate('KebakaranTambahScreen')
    }
    const renderContent = () => (
        <View
            style={{
                borderRadius: 30,
                backgroundColor: 'white',
                height: bottomSheetHeight,
            }}
        >
            <View style={{alignItems: 'center'}}>
                <Icon name='menu' size={40}
                      color={COLORS.primary}/>
                <Button icon="camera" mode="contained"  onPress={openTab} style={{backgroundColor:COLORS.primary}} >
                    Laporkan Kebakaran
                </Button>

            </View>
        </View>
    );

    const sheetRef = React.useRef(0);

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Kebakaran</Text>
            </View>
            <MapView style={style.map}/>
            <BottomSheet
                // enabledInnerScrolling={true}
                // enabledBottomInitialAnimation={true}
                // enabledBottomClamp={true}
                enabledContentTapInteraction={false}
                ref={sheetRef}
                snapPoints={[bottomSheetHeight - 40, 300, 200]}
                borderRadius={10}
                renderContent={renderContent}
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
    footer: {
        flex: 1,
        height: 200,
        paddingVertical: 20,
        justifyContent: 'flex-end',
        marginHorizontal: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cartCard: {
        height: 40,
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

export default KebakaranScreen;
