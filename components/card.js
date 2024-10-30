import React from 'react';
import {Text, View, Image,StyleSheet, TouchableOpacity} from 'react-native';

export default function Card({titulo, imagen, onPress}){
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
            <Image source={imagen} style={styles.imagen} resizeMode='cover'/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 30,
    },
    contenedor:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo:{
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    imagen:{
        width: '95%',
        height: 170,
        borderRadius: 10,
        margin: 8,
    }
});