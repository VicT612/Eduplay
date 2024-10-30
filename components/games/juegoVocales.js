import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

export default function JuegoVocales() {
    const navigation = useNavigation();
    const vocales = [
        {
            imagen: require('../../assets/images/vocales/letra1.png'),
            sonido: require('../../assets/images/vocales/sonidos/letra1.mp3')
        },
        {
            imagen: require('../../assets/images/vocales/letra2.png'),
            sonido: require('../../assets/images/vocales/sonidos/letra2.mp3')
        },
        {
            imagen: require('../../assets/images/vocales/letra3.png'),
            sonido: require('../../assets/images/vocales/sonidos/letra3.mp3')
        },
        {
            imagen: require('../../assets/images/vocales/letra4.png'),
            sonido: require('../../assets/images/vocales/sonidos/letra4.mp3')
        },  
        {
            imagen: require('../../assets/images/vocales/letra5.png'),
            sonido: require('../../assets/images/vocales/sonidos/letra5.mp3')
        }
    ];
    const reproducirSonido = async (sonido) => {
        try{
            const {sound} = await Audio.Sound.createAsync(sonido);
            await sound.playAsync();
        }catch(error){
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0B0A4C', '#4B169D']}
                style={styles.fondo}>
                <Text style={styles.titulo}>LAS VOCALES </Text>
                <View style={styles.contenedor}>
                    {vocales.map((vocal, index)=>(
                        <TouchableOpacity key={index} style={styles.imagencont} onPress={()=>reproducirSonido(vocal.sonido)}>
                            <Image source={vocal.imagen} style={styles.imagen}/>
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
    fondo:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    titulo:{
      fontSize: 40,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    contenedor:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },
    imagen:{
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    imagencont:{
      width: 300,
      height: 120,
    }
});