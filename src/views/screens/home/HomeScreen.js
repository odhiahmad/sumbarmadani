import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import {FlatList, TouchableHighlight,} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../consts/colors';
import foods from '../../../consts/foods';
import menus from "../../../consts/menus";
import menusMore from "../../../consts/menusMore";
import sliders from "../../../consts/sliders";
import BottomSheet from 'reanimated-bottom-sheet';

const {width, height} = Dimensions.get('screen');

const cardWidth = width / 2 - 20;
const cardWidth2 = width / 1.3;
const menusWidth = width / 5;
const menusWidthPadding = width / 40
const bottomSheetHeight = height / 2;
const menusHeight = height / 8;

const HomeScreen = ({navigation}) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

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
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={4}
                data={menusMore}
                renderItem={({item}) => <ListCategoriesMenuMore menuKit={item}/>}
                listKey={(item, index) => index.toString()}

            />

        </View>
    );

    const sheetRef = React.useRef(null);

    const ListCategoriesMenu = ({menuKit}) => {

        if (menuKit.name === 'Lainnya') {
            return (
                <TouchableHighlight
                    underlayColor={COLORS.white}
                    activeOpacity={0.6}
                    onPress={() => sheetRef.current.snapTo(0)}>
                    <View style={style.menus}>
                        <View style={{alignItems: 'center', padding: 5}}>
                            <Image source={menuKit.image} style={{height: 40, width: 40}}/>
                        </View>
                        <View style={{alignItems: 'center', marginHorizontal: 10, textAlign: 'center'}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>{menuKit.name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor={COLORS.white}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate(menuKit.url)}>
                    <View style={style.menus}>
                        <View style={{alignItems: 'center', padding: 5}}>
                            <Image source={menuKit.image} style={{height: 40, width: 40}}/>
                        </View>
                        <View style={{alignItems: 'center', marginHorizontal: 10, textAlign: 'center'}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>{menuKit.name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }
    };

    const ListCategoriesMenuMore = ({menuKit}) => {


            return (
                <TouchableHighlight
                    underlayColor={COLORS.white}
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate(menuKit.url)}>
                    <View style={style.menus}>
                        <View style={{alignItems: 'center', padding: 5}}>
                            <Image source={menuKit.image} style={{height: 40, width: 40}}/>
                        </View>
                        <View style={{alignItems: 'center', marginHorizontal: 10, textAlign: 'center'}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>{menuKit.name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );

    };

    const Card = ({food}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsScreen', food)}>
                <View style={style.card}>
                    <View style={{alignItems: 'center', padding: 10}}>
                        <Image source={food.image} style={{height: 120, width: 120}}/>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
                        <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
                            {food.ingredients}
                        </Text>
                    </View>
                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        marginTop: 10,*/}
                    {/*        marginHorizontal: 20,*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        justifyContent: 'space-between',*/}
                    {/*    }}>*/}
                    {/*    <Text style={{fontSize: 18, fontWeight: 'bold'}}>*/}
                    {/*        ${food.price}*/}
                    {/*    </Text>*/}
                    {/*    <View style={style.addToCartBtn}>*/}
                    {/*        <Icon name="add" size={20} color={COLORS.white}/>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
            </TouchableHighlight>
        );
    };

    const Card2 = ({slider}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsScreen', slider)}>
                <View style={style.card2}>
                    <View style={{alignItems: 'center', padding: 0}}>
                        <Image source={slider.image} style={{height: 200, width: 340,borderRadius:15}}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };


    const Header = () => {
        return (
            <View>
                <View style={style.header}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 28}}>Hello,</Text>
                            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
                                Sumbar Madani
                            </Text>
                        </View>
                        <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
                            What do you want today
                        </Text>
                    </View>
                    {/*<Image*/}
                    {/*    source={require('../../assets/person.png')}*/}
                    {/*    style={{height: 50, width: 50, borderRadius: 25}}*/}
                    {/*/>*/}
                </View>
                <View style={{ paddingHorizontal: 20,marginTop:30}}>
                    <Text style={{fontSize: 14, color: COLORS.dark,fontWeight:'bold'}}>
                        Terbaru di Sumbar
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={sliders}
                    renderItem={({item}) => <Card2 slider={item}/>}
                />
            </View>
        )
    }

    const Footer = () => {
        return (
            <View>
                <View style={{ paddingHorizontal: 20,marginTop:20}}>
                    <Text style={{fontSize: 14, color: COLORS.dark,fontWeight:'bold'}}>
                        Menu
                    </Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    data={menus}
                    renderItem={({item}) => <ListCategoriesMenu menuKit={item}/>}
                    listKey={(item, index) => index.toString()}

                />
                <View style={{ paddingHorizontal: 20,marginTop:30,flexDirection:'row', justifyContent: 'space-between',}}>
                    <Text style={{fontSize: 14, color: COLORS.dark,fontWeight:'bold',textAlign:'left'}}>
                        Covid Sumbar
                    </Text>
                    <Text onPress={() => navigation.navigate('LawanCoronaScreen')} style={{textDecorationLine: 'underline',fontSize: 14, color: COLORS.primary,textAlign:'right'}}>
                        Lihat Semua
                    </Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={foods}
                    renderItem={({item}) => <Card food={item}/>}
                    listKey={(item, index) => index.toString()}

                />

            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <FlatList
                // data={data}
                ListHeaderComponent={Header}
                ListFooterComponent={Footer}/>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[bottomSheetHeight, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />

        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    categoryContainer: {
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 15,
        elevation: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: COLORS.white,
    },
    menus: {
        height: 90,
        width: menusWidth,
        marginHorizontal: menusWidthPadding,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 15,
        elevation: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: COLORS.white,
    },
    card2: {
        height: 200,
        width: 340,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 15,
        borderRadius: 15,
        elevation: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: COLORS.white,
    },
    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
