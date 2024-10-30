import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function AnimalMemoryGame() {
  const screenWidth = Dimensions.get('window').width;

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

  useEffect(() => {
    setupGame();
  }, []);

  const setupGame = () => {
    const animalData = [
      { imagen: require('../../assets/images/animales/images/cerdo.jpeg'), sonido: require('../../assets/images/animales/audio/cerdo.mp3'), name: 'Cerdo' },
      { imagen: require('../../assets/images/animales/images/coyote.jpeg'), sonido: require('../../assets/images/animales/audio/coyote.mp3'), name: 'Coyote' },
      { imagen: require('../../assets/images/animales/images/lobo.jpeg'), sonido: require('../../assets/images/animales/audio/lobo.mp3'), name: 'Lobo' },
      { imagen: require('../../assets/images/animales/images/puma.jpg'), sonido: require('../../assets/images/animales/audio/puma.mp3'), name: 'Puma' },
      { imagen: require('../../assets/images/animales/images/rinoceronte.jpeg'), sonido: require('../../assets/images/animales/audio/rinoceronte.mp3'), name: 'Rinoceronte' },
      { imagen: require('../../assets/images/animales/images/tigre.jpeg'), sonido: require('../../assets/images/animales/audio/tigre.mp3'), name: 'Tigre' },
      { imagen: require('../../assets/images/animales/images/vaca.jpeg'), sonido: require('../../assets/images/animales/audio/vaca.mp3'), name: 'Vaca' },
      { imagen: require('../../assets/images/animales/images/oveja.jpeg'), sonido: require('../../assets/images/animales/audio/oveja.mp3'), name: 'Oveja' },
    ];

    // Randomly select 4 unique animals from the full set
    const selectedAnimals = animalData.sort(() => Math.random() - 0.5).slice(0, 4);
    const duplicatedData = [...selectedAnimals, ...selectedAnimals];

    // Shuffle the 8 cards created from the 4 pairs
    const shuffledCards = duplicatedData.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setFoundPairs([]);
  };

  const handleCardPress = async (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !foundPairs.includes(index)) {
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        const firstIndex = flippedCards[0];
        const secondIndex = index;

        if (cards[firstIndex].name === cards[secondIndex].name) {
          setFoundPairs([...foundPairs, firstIndex, secondIndex]);
          await reproducirSonido(cards[secondIndex].sonido);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

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
        <View style={[styles.celularContainer, screenWidth < 600 ? styles.mobileContainer : null]}>
          {cards.map((animal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imagencont,
                flippedCards.includes(index) || foundPairs.includes(index) ? styles.flipped : null,
              ]}
              onPress={() => handleCardPress(index)}
            >
              {(flippedCards.includes(index) || foundPairs.includes(index)) && (
                <Image source={animal.imagen} style={styles.imagen} />
              )}
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
  celularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  mobileContainer: {
    gap: 2,
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagencont: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipped: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
