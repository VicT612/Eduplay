import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const BALL_IMAGE = require('../../assets/images/numeros/ball.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const MOBILE_WIDTH = Math.min(400, SCREEN_WIDTH * 0.95);
const BALLS_PER_ROW = 3;

export default function JuegoNumeros() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState('first');
  const [result, setResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false); // Nueva variable de estado

  const handleNumberPress = (number) => {
    if (isDisabled) return; // Evita el clic si está deshabilitado

    if (currentNumber === 'first') {
      setFirstNumber(number);
      setCurrentNumber('second');
    } else {
      setSecondNumber(number);
      setResult(firstNumber + number);
      setIsDisabled(true); // Deshabilita los botones
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  const resetGame = () => {
    setFirstNumber(0);
    setSecondNumber(0);
    setCurrentNumber('first');
    setResult(null);
    setIsDisabled(false); // Habilita los botones nuevamente
  };

  const renderBalls = (numBalls) => {
    const rows = Math.ceil(numBalls / BALLS_PER_ROW);
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.ballRow}>
        {Array.from({ length: Math.min(BALLS_PER_ROW, numBalls - rowIndex * BALLS_PER_ROW) })
          .map((_, i) => (
            <Image 
              key={`ball-${rowIndex}-${i}`} 
              source={BALL_IMAGE} 
              style={styles.ball} 
            />
          ))}
      </View>
    ));
  };

  return (
    <View style={styles.containerOuter}>
      <LinearGradient
        colors={['rgba(14,0,62,1)', 'rgba(34,2,148,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.containerMobile}
      >
        <StatusBar style="light" />
        
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Numeros</Text>
          <View style={styles.questionCounter}>
            <Text style={styles.questionText}>Q1/10</Text>
          </View>
        </View>

        {/* Operation Display Area */}
        <View style={styles.imagencont}>
          <View style={styles.equation}>
            {firstNumber > 0 && (
              <View style={styles.ballContainer}>
                {renderBalls(firstNumber)}
              </View>
            )}
            
            {currentNumber === 'second' && (
              <Text style={styles.operator}>+</Text>
            )}
            
            {secondNumber > 0 && (
              <View style={styles.ballContainer}>
                {renderBalls(secondNumber)}
              </View>
            )}
            
            {result !== null && (
              <>
                <Text style={styles.operator}>=</Text>
                <View style={styles.resultContainer}>
                  <Text style={styles.result}>{result}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Number Pad */}
        <View style={styles.contenedor}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <TouchableOpacity
              key={number}
              style={styles.numberButton}
              onPress={() => handleNumberPress(number)}
              disabled={isDisabled} // Deshabilita el botón si isDisabled es true
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    backgroundColor: '#8273E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMobile: {
    width: MOBILE_WIDTH,
    height: MOBILE_WIDTH * 2,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  questionCounter: {
    backgroundColor: '#ffffff20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
  },
  imagencont: {
    width: '100%',
    backgroundColor: '#ffffff20',
    marginVertical: 15,
    borderRadius: 10,
    padding: 15,
    minHeight: 120,
  },
  equation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  ballContainer: {
    backgroundColor: '#d8ccf1',
    borderRadius: 5,
    padding: 4,
    minWidth: 80,
  },
  ballRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 4,
    marginVertical: 2,
  },
  ball: {
    width: 24,
    height: 24,
  },
  operator: {
    color: 'white',
    fontSize: 28,
    marginHorizontal: 8,
  },
  resultContainer: {
    backgroundColor: '#d8ccf1',
    borderRadius: 5,
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  result: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
  },
  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
    paddingTop: 20,
  },
  numberButton: {
    width: '28%',
    aspectRatio: 1,
    backgroundColor: '#CEB8F2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberText: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
