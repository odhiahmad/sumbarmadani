import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Notifikasi from "../screens/Notifikasi";
import Aktivitas from "../screens/Aktivitas";
import Profil from "../screens/Profil";
import Lapor from "../screens/Lapor";


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    paddingBottom: 15,
                    height: 70,
                    fontSize: 20,
                    borderTopWidth: 0,
                    elevation: 0,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    zIndex: 2,
                    marginTop:-10
                },
                // showLabel: false,
                activeTintColor: COLORS.primary,
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({color}) => (
                        <Icon name="home-filled" color={color} size={28}/>
                    ),
                }}
            />
            <Tab.Screen
                name="LocalMall"
                component={Aktivitas}
                options={{
                    tabBarLabel: 'Aktivitas',
                    tabBarIcon: ({color}) => (
                        <Icon name="work" color={color} size={28}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Lapor}
                options={{
                    tabBarLabel: 'Lapor',
                    tabBarIcon: ({color}) => (
                        <View
                            style={{
                                height: 60,
                                width: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                borderRadius: 30,
                                top: -25,
                                elevation: 5,
                            }}>
                            <Icon name="camera-alt" color={COLORS.primary} size={28}/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Notifikasi}
                options={{
                    tabBarLabel: 'Notifikasi',
                    tabBarIcon: ({color}) => (
                        <Icon name="notifications" color={color} size={28}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Profil}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({color}) => (
                        <Icon name="person" color={color} size={28}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;
