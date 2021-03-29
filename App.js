import 'react-native-gesture-handler';
import React from 'react';
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


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {/*<Stack.Screen name="BoardScreen" component={OnBoardScreen} />*/}

                <Stack.Screen name="Home" component={BottomNavigator}/>
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
                <Stack.Screen name="DetailsNewsScreen" component={DetailsNewsScreen}/>
                <Stack.Screen name="DetailPariwisataScreen" component={DetailPariwisataScreen}/>

                <Stack.Screen name="KebakaranTambahScreen" component={KebakaranTambahScreen}/>
                <Stack.Screen name="LalulintasTambahScreen" component={LalulintasTambahScreen}/>
                <Stack.Screen name="BanjirTambahScreen" component={BanjirTambahScreen}/>
                <Stack.Screen name="TanahLongsorTambahScreen" component={TanahLongsorTambahScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
