import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Audio } from 'expo-av';

export default function JuegoAnimales() {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

    const animales = [
        { imagen: require('../../assets/images/animales/images/cerdo.jpeg'), sonido: require('../../assets/images/animales/audio/cerdo.mp3') },
        { imagen: require('../../assets/images/animales/images/coyote.jpeg'), sonido: require('../../assets/images/animales/audio/coyote.mp3') },
        { imagen: require('../../assets/images/animales/images/lobo.jpeg'), sonido: require('../../assets/images/animales/audio/lobo.mp3') },
        { imagen: require('../../assets/images/animales/images/puma.jpg'), sonido: require('../../assets/images/animales/audio/puma.mp3') },
        { imagen: require('../../assets/images/animales/images/rinoceronte.jpeg'), sonido: require('../../assets/images/animales/audio/rinoceronte.mp3') },
        { imagen: require('../../assets/images/animales/images/tigre.jpeg'), sonido: require('../../assets/images/animales/audio/tigre.mp3') },
        { imagen: require('../../assets/images/animales/images/vaca.jpeg'), sonido: require('../../assets/images/animales/audio/vaca.mp3') },
        { imagen: require('../../assets/images/animales/images/oveja.jpeg'), sonido: require('../../assets/images/animales/audio/oveja.mp3') },
    ];

    const reproducirSonido = async (sonido) => {
        try {
            const { sound } = await Audio.Sound.createAsync(sonido);
            await sound.playAsync();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0B0A4C', '#4B169D']} style={styles.fondo}>
                <Text style={styles.titulo}>ANIMALES</Text>
                <View style={[styles.contenedor, screenWidth < 600 ? styles.mobileContainer : null]}>
                    {animales.map((animal, index) => (
                        <TouchableOpacity key={index} style={styles.imagencont} onPress={() => reproducirSonido(animal.sonido)}>
                            <Image source={animal.imagen} style={styles.imagen} />
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fondo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    titulo: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    contenedor: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        padding: 10,
    },
    mobileContainer: {
        width: '90%', 
        paddingHorizontal: 5,
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imagencont: {
        width: 150, 
        height: 150,
        margin: 5,
    }
});
