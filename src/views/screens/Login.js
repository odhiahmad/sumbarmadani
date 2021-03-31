import React, {useContext, useEffect, useState, useReducer} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CheckBox} from 'react-native-elements'
import {validateAll} from 'indicative/validator';
import {AuthContext} from '../../utils/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from 'react-native-paper';

import {apiLogin} from "../../consts/api";
import LoaderModal from "../components/LoaderModal";
import COLORS from "../../consts/colors";
import * as GoogleSignIn from 'expo-google-sign-in';

const Login = ({}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        loading: false,

    });

    const {colors} = useTheme();

    const {signIn} = useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {


        setData({
            ...data,
            loading: true
        });
        return fetch(apiLogin, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.response === 1) {
                    const masuk = true;
                    const token = 'aQQEQWEDDasdas423r2dsFsdfssfsdfsfsdfsdfqsfsf534534ddfgdfgdfgfd';
                    AsyncStorage.setItem('token', token)
                    AsyncStorage.setItem('pegawai', json.result[0].pegawai);
                    AsyncStorage.setItem('token', json.result[0].pegawai);
                    AsyncStorage.setItem('username', json.result[0].username);
                    AsyncStorage.setItem('nama_asn', json.result[0].nama_asn);
                    AsyncStorage.setItem('opd', json.result[0].opd);
                    AsyncStorage.setItem('nm_opd', json.result[0].nm_opd);
                    AsyncStorage.setItem('sub_opd', json.result[0].sub_opd);
                    AsyncStorage.setItem('nm_sub_opd', json.result[0].nm_sub_opd);
                    AsyncStorage.setItem('jabatan', json.result[0].jabatan);
                    AsyncStorage.setItem('nip', json.result[0].nip);
                    AsyncStorage.setItem('id_eselon', json.result[0].id_eselon);
                    AsyncStorage.setItem('eselon', json.result[0].eselon);
                    AsyncStorage.setItem('group', json.result[0].group.toString());
                    AsyncStorage.setItem('pangkat', json.result[0].pangkat);
                    AsyncStorage.setItem('jenjang', json.result[0].jenjang);

                    const dataPegawai = json.result;
                    console.log(json.result)
                    signIn({masuk, token,dataPegawai})
                    setData({
                        ...data,
                        loading: false
                    });

                } else {
                    alert(json.message)
                    setData({
                        ...data,
                        loading: false
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Anda sedang tidak terhubung ke jaringan internet')
                setData({
                    ...data,
                    loading: false
                });
            });
    }

    initAsync = async () => {
        await GoogleSignIn.initAsync({
            // You may ommit the clientId when the firebase `googleServicesFile` is configured
            clientId: '<YOUR_IOS_CLIENT_ID>',
        });
        _syncUserWithStateAsync();
    };

    const _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
    };

    const signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    const signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                _syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };


    return (
        <View style={styles.container}>
            <LoaderModal
                loading={data.loading}/>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Selamat Datang!</Text>
                <Text style={styles.text_footer}>Sumbar Madani</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    <Text style={{color: '#009387', marginTop: 15}}></Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            loginHandle(data.username, data.password)
                        }}
                    >

                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>

                    </TouchableOpacity>

                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => navigation.navigate('SignUpScreen')}*/}
                    {/*    style={[styles.signIn, {*/}
                    {/*        borderColor: '#009387',*/}
                    {/*        borderWidth: 1,*/}
                    {/*        marginTop: 15*/}
                    {/*    }]}*/}
                    {/*>*/}
                    {/*    <Text style={[styles.textSign, {*/}
                    {/*        color: '#009387'*/}
                    {/*    }]}>Sign Up</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </Animatable.View>
        </View>
    );

};
export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'white',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        backgroundColor:COLORS.primary,
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

