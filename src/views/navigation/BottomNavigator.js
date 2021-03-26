import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from '../../consts/colors';
import {View} from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import Notifikasi from "../screens/Notifikasi";
import NearbyScreen from "../screens/nearby/NearByScreen";
import Profil from "../screens/Profil";
import Lapor from "../screens/Lapor";

import BencanaScreen from "../screens/bencana/BencanaScreen";
import DigitalTalentScreen from "../screens/digitalTalent/DigitalTalentScreen";

import LawanCoronaScreen from "../screens/lawanCorona/LawanCoronaScreen";
import NewsScreen from "../screens/news/NewsScreen";
import PanganScreen from "../screens/pangan/PanganScreen";
import PariwisataScreen from "../screens/pariwisata/PariwisataScreen";
import ResponsScreen from "../screens/respons/ResponsScreen";
import SiagaScreen from "../screens/siaga/SiagaScreen";
import CovidScreen from "../screens/covid/CovidScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackHome = () => (
    <Stack.Navigator>

        <Stack.Screen name="HomeScreen" component={HomeScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="BencanaScreen" component={BencanaScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="DigitalTalentScreen" component={DigitalTalentScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="LawanCoronaScreen" component={LawanCoronaScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="NewsScreen" component={NewsScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="PanganScreen" component={PanganScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="PariwisataScreen" component={PariwisataScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="ResponsScreen" component={ResponsScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="SiagaScreen" component={SiagaScreen}
                      options={{
                          headerShown: false,
                      }}
        />
        <Stack.Screen name="CovidScreen" component={CovidScreen}
                      options={{
                          headerShown: false,
                      }}
        />

    </Stack.Navigator>
)

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
                component={StackHome}
                options={{
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({color}) => (
                        <Icon name="home-filled" color={color} size={28}/>
                    ),
                }}
            />
            <Tab.Screen
                name="NearBy"
                component={NearbyScreen}
                options={{
                    tabBarLabel: 'Sekitar',
                    tabBarIcon: ({color}) => (
                        <Icon name="rss-feed" color={color} size={28}/>
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
                                top: -15,
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
