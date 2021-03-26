import React, {useEffect, useMemo, useReducer,useState} from 'react';

import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';
import { Camera } from 'expo-camera';

const Lapor = ({navigation}) => {
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

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
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

export default Lapor;
