import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextView from '../Components/TextView';

const SplashScreen = () => {
    const navigation = useNavigation();


    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();


        const timeout = setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 2500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
                    }}
                    style={styles.logo}
                />
                <TextView
                    text={'MyShop'}
                    fontSize={28}
                    fontWeight={'700'}
                    color={'#fff'}
                />

            </Animated.View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        tintColor: '#fff',
    },

});
