import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import DetailsNewsScreen from "./src/views/screens/news/DetailNewsScreen";
import BottomNavigator from './src/views/navigation/BottomNavigator';

import OnBoardScreen from './src/views/screens/OnBoardScreen';
import DetailPariwisataScreen from "./src/views/screens/pariwisata/DetailPariwisataScreen";
import KebakaranTambahScreen from "./src/views/screens/bencana/kebakaran/KebakaranTambahScreen";
import TanahLongsorTambahScreen from "./src/views/screens/bencana/tanahLongsor/TanahLonsorTambahScreen";
import BanjirTambahScreen from "./src/views/screens/bencana/banjir/BanjirTambahScreen";
import LalulintasTambahScreen from "./src/views/screens/bencana/lalulintas/LaluLintasTambahScreen";
import {initialState, reducer} from "./src/reducers/reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "./src/utils/authContext";
import Login from "./src/views/screens/Login";
import {stateConditionString} from "./src/utils/helpers";

const Stack = createStackNavigator();

function Auth({}) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}


const createHomeStack = () => {
    return (
        // <NavigationContainer>
        //     <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={BottomNavigator}/>
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
                <Stack.Screen name="DetailsNewsScreen" component={DetailsNewsScreen}/>
                <Stack.Screen name="KebakaranTambahScreen" component={KebakaranTambahScreen}/>
                <Stack.Screen name="LalulintasTambahScreen" component={LalulintasTambahScreen}/>
                <Stack.Screen name="BanjirTambahScreen" component={BanjirTambahScreen}/>
                <Stack.Screen name="TanahLongsorTambahScreen" component={TanahLongsorTambahScreen}/>
            </Stack.Navigator>
        // </Stack.Navigator>
        /*</NavigationContainer>*/
    )
        ;
};


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('token');
                console.log(userToken)
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            console.log(userToken)
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
        };
        bootstrapAsync();
    }, []);

    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `AsyncStorage`

    const authContextValue = useMemo(
        () => ({
            signIn: async (data) => {
                if (data.masuk === true) {
                    dispatch({type: 'SIGN_IN', token: data.token});
                    await AsyncStorage.setItem('token',data.token);
                } else {
                    dispatch({type: 'TO_SIGNIN_PAGE'});
                }
            },
            signOut: async (data) => {
                AsyncStorage.clear()
                dispatch({type: 'SIGN_OUT'});
            },

            signUp: async (data) => {
                if (
                    data &&
                    data.emailAddress !== undefined &&
                    data.password !== undefined
                ) {
                    dispatch({type: 'SIGNED_UP', token: 'dummy-auth-token'});
                } else {
                    dispatch({type: 'TO_SIGNUP_PAGE'});
                }
            },
        }),
        [],
    );

    const chooseScreen = (state) => {
        let navigateTo = stateConditionString(state);
        let arr = [];

        switch (navigateTo) {
            case 'LOAD_SIGNIN':
                arr.push(<Stack.Screen options={{
                    headerShown: false,
                }} name="Login" component={Login}/>);
                break;

            case 'LOAD_HOME':
                arr.push(
                    <Stack.Screen
                        name="Home"
                        component={createHomeStack}
                        options={{
                            headerShown: false,
                        }}
                    />,
                );
                break;
            default:
                arr.push(<Stack.Screen options={{
                    headerShown: false,
                }} name="Login" component={Login}/>);
                break;
        }
        return arr[0];
    };


    return (
        <AuthContext.Provider value={authContextValue}>
            <NavigationContainer>
                <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default App;
