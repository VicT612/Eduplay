import React, { useState, useEffect } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet, Modal, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const figuras = ["star", "heart", "triangle", "square", "octagon", "diamond"];

// Función para obtener cuatro figuras aleatorias
function generarFigurasAleatorias() {
    let seleccionadas = [];
    while (seleccionadas.length < 4) {
        const figura = figuras[Math.floor(Math.random() * figuras.length)];
        if (!seleccionadas.includes(figura)) {
            seleccionadas.push(figura);
        }
    }
    return seleccionadas;
}

export default function EnhancedFigurasGame() {
    const [figuraObjetivo, setFiguraObjetivo] = useState('');
    const [figurasAleatorias, setFigurasAleatorias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [resultadoTexto, setResultadoTexto] = useState('');

    useEffect(() => {
        const nuevasFiguras = generarFigurasAleatorias();
        setFigurasAleatorias(nuevasFiguras);
        setFiguraObjetivo(nuevasFiguras[Math.floor(Math.random() * nuevasFiguras.length)]);
    }, []);

    const crearPanResponder = (figura) => {
        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: position.x, dy: position.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                if (figura === figuraObjetivo) {
                    setResultadoTexto('¡Correcto!');
                    const nuevasFiguras = generarFigurasAleatorias();
                    setFigurasAleatorias(nuevasFiguras);
                    setFiguraObjetivo(nuevasFiguras[Math.floor(Math.random() * nuevasFiguras.length)]);
                } else {
                    setResultadoTexto('Incorrecto. Intenta de nuevo');
                }
                setModalVisible(true);

                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();

                setTimeout(() => {
                    setModalVisible(false);
                }, 1000);
            }
        });

        return { position, panResponder };
    };

    return (
        <LinearGradient
            colors={['#0B0A4C', '#4B169D']}
            style={styles.container}
        >
            <Text style={styles.titulo}>Arrastra el icono correcto</Text>
            
            <View style={styles.figuraObjetivo}>
                <Ionicons name={figuraObjetivo} size={50} color="black" />
            </View>

            <View style={styles.opciones}>
                {figurasAleatorias.map((figura) => {
                    const { position, panResponder } = crearPanResponder(figura);
                    return (
                        <Animated.View
                            key={figura}
                            style={[
                                styles.figuraOpcion,
                                { transform: position.getTranslateTransform() }
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <Ionicons name={figura} size={40} color="white" />
                        </Animated.View>
                    );
                })}
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{resultadoTexto}</Text>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    figuraObjetivo: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        marginBottom: 50,
    },
    opciones: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        gap: 20,
    },
    figuraOpcion: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4a90e2',
        borderRadius: 10,
        elevation: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
