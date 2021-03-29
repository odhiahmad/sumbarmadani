import React from 'react';
import {SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}/>
);

const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}/>
);

const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}/>
);


const IkanScreen = ({navigation}) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Harga Ikan'},
        {key: 'second', title: 'Jenis Ikan'},
        {key: 'third', title: 'Daerah'},
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={COLORS.primary}
            inactiveColor={COLORS.primary}
            indicatorStyle={{ backgroundColor: COLORS.primary}}
            indicatorContainerStyle={{ marginHorizontal: 40, paddingHorizontal: 120 }}
            labelStyle={[{ textTransform: 'capitalize' }]}
            style={{ backgroundColor: '#fff', borderBottomColor: '#eee', borderBottomWidth: 1, elevation: 0 }}
        />
    );

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Pasar Ikan</Text>
            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
            {/*<TabViewAnimated*/}
            {/*    style={{ flex: 1 }}*/}
            {/*    navigationState={{index,routes}}*/}
            {/*    renderScene={_renderPage}*/}
            {/*    // renderHeader={_renderHeader}*/}
            {/*    onRequestChangeTab={index => this.setState({ index })}*/}
            {/*/>*/}

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
});

export default IkanScreen;
