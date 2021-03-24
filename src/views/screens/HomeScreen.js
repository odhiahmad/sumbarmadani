import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    FlatList,
    ScrollView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import {ImageBackground} from "react-native-web";
import places from "../../consts/places";

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
const cardWidth2 = width / 1.3;

const HomeScreen = ({navigation}) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

    const categoryIcons = [
        <Icon name="flight" size={30} color={COLORS.primary}></Icon>,
        <Icon name="beach-access" size={30} color={COLORS.primary}/>,
        <Icon name="near-me" size={30} color={COLORS.primary}/>,
        <Icon name="place" size={30} color={COLORS.primary}/>,
    ];

    const ListCategoriesMenu = () => {
        return (
            <View style={style.categoryContainer}>
                {categoryIcons.map((icon, index) => (
                    <View key={index} style={style.iconContainer}>
                        {icon}
                    </View>
                ))}
            </View>
        );
    };

    const ListCategories = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.categoriesListContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => setSelectedCategoryIndex(index)}>
                        <View
                            style={{
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary
                                        : COLORS.secondary,
                                ...style.categoryBtn,
                            }}>
                            <View style={style.categoryBtnImgCon}>
                                <Image
                                    source={category.image}
                                    style={{height: 35, width: 35, resizeMode: 'cover'}}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color:
                                        selectedCategoryIndex == index
                                            ? COLORS.white
                                            : COLORS.primary,
                                }}>
                                {category.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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

    const Card2 = ({food}) => {
        return (
            <TouchableHighlight
                underlayColor={COLORS.white}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsScreen', food)}>
                <View style={style.card2}>
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

    // const CardKategori = ({place}) => {
    //     return (
    //         <TouchableOpacity
    //             activeOpacity={0.8}
    //             onPress={() => navigation.navigate('DetailsScreen', place)}>
    //             <ImageBackground style={style.cardImage} source={place.image}>
    //                 <Text
    //                     style={{
    //                         color: COLORS.white,
    //                         fontSize: 20,
    //                         fontWeight: 'bold',
    //                         marginTop: 10,
    //                     }}>
    //                     {place.name}
    //                 </Text>
    //                 <View
    //                     style={{
    //                         flex: 1,
    //                         justifyContent: 'space-between',
    //                         flexDirection: 'row',
    //                         alignItems: 'flex-end',
    //                     }}>
    //                     <View style={{flexDirection: 'row'}}>
    //                         <Icon name="place" size={20} color={COLORS.white}/>
    //                         <Text style={{marginLeft: 5, color: COLORS.white}}>
    //                             {place.location}
    //                         </Text>
    //                     </View>
    //                     <View style={{flexDirection: 'row'}}>
    //                         <Icon name="star" size={20} color={COLORS.white}/>
    //                         <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text>
    //                     </View>
    //                 </View>
    //             </ImageBackground>
    //         </TouchableOpacity>
    //     );
    // };

    const Header = () => {
        return (
            <View>
                <View style={style.header}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 28}}>Hello,</Text>
                            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
                                Odhi Ahmad
                            </Text>
                        </View>
                        <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
                            What do you want today
                        </Text>
                    </View>
                    <Image
                        source={require('../../assets/person.png')}
                        style={{height: 50, width: 50, borderRadius: 25}}
                    />
                </View>
                <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={foods}
                    renderItem={({item}) => <Card2 food={item}/>}
                />
            </View>
        )
    }

    const Footer = () => {
        return (
            <View>
                {/*<ListCategories/>*/}
                <ListCategoriesMenu/>
                {/*<ListCategoriesMenu/>*/}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={foods}
                    renderItem={({item}) => <Card food={item}/>}
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

            {/*<View*/}
            {/*    style={{*/}
            {/*        marginTop: 40,*/}
            {/*        flexDirection: 'row',*/}
            {/*        paddingHorizontal: 20,*/}
            {/*    }}>*/}
            {/*    <View style={style.inputContainer}>*/}
            {/*        <Icon name="search" size={28}/>*/}
            {/*        <TextInput*/}
            {/*            style={{flex: 1, fontSize: 18}}*/}
            {/*            placeholder="Search for food"*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*    <View style={style.sortBtn}>*/}
            {/*        <Icon name="tune" size={28} color={COLORS.white}/>*/}
            {/*    </View>*/}
            {/*</View>*/}

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
        backgroundColor: COLORS.white,
    },
    card2: {
        height: 220,
        width: cardWidth2,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
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
