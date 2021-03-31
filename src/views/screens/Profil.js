import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {Button} from "react-native-paper";
import {AuthContext} from "../../utils/authContext";

const Profil = ({navigation}) => {
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

                    <Text style={style.userName}></Text>
                    <Text style={style.aboutUser}>
                        No details added
                    </Text>
                </View>
                <View style={style.cartProfil}>
                    <Button icon="camera" onPress={()=>signOut()} mode="contained" style={{backgroundColor:COLORS.primary}} >
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
        width:'98%',
        height: 220,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 3,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },

    cartProfilFooter: {
        width:'98%',
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
