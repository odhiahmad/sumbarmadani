import React, {useEffect, useState,useRef} from 'react';

import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../consts/colors';
import {Camera} from "expo-camera";
import LoaderModal from "../../../components/LoaderModal";
import * as ImageManipulator from 'expo-image-manipulator';



const TanahLongsorKameraScreen = ({navigation}) => {
    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const [loading,setLoading] = useState(false)

    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState (null)

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    const ambilFoto = () => {
        setTimeout(() => {
            __takePicture();
        }, 1000);
    }

    const __takePicture = async () => {
        setLoading(true)
        if (cameraRef.current) {
            const options = { quality: 0, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            let source = await ImageManipulator.manipulateAsync(
                data.uri,
                [{ resize: { width: 300, height: 300 } }],
                { compress: 1, format: "jpeg", base64: true }
            );

            console.log(source)

            if (source) {
                setLoading(false)
                navigation.navigate('TanahLongsorTambahScreen',{source})
                // await cameraRef.current.pausePreview();
                //                 // setPreviewVisible(true);
                //                 // setCapturedImage(source)
                //                 // console.log("picture source", source);
            }
        }
        // if (this.camera) {
        //     let photo = await this.camera.takePictureAsync();
        //     console.log(photo)
        //     setPreviewVisible(true);
        //     setCapturedImage(photo)
        // }

    };


    const CameraPreview = ({photo}) => {
        console.log('sdsfds', photo)
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{uri: photo && photo.uri}}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    };

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <LoaderModal
                loading={loading}/>
            {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage}/>
            ) : (
                <Camera style={style.camera} type={type} ref={cameraRef}>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            flexDirection: 'row',
                            flex: 1,
                            width: '100%',
                            padding: 20,
                            justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                                alignSelf: 'center',
                                flex: 1,
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                onPress={ambilFoto}
                                style={{
                                    width: 70,
                                    height: 70,
                                    bottom: 0,
                                    borderRadius: 50,
                                    backgroundColor: COLORS.primary
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon name="camera-alt" color={COLORS.light} size={40}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.buttonContainer}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={style.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>)}
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

export default TanahLongsorKameraScreen;
