import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
import COLORS from "../../consts/colors";

const LoaderModal = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Text style={{color:COLORS.primary,textAlign:'center'}}>Sumbar Madani</Text>
                    <ActivityIndicator
                        size="small"
                        color={COLORS.primary}
                        animating={loading} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        padding:30,
        backgroundColor: '#FFFFFF',
        height: 120,
        width: 120,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default LoaderModal;
