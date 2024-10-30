import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MOBILE_WIDTH = Math.min(400, SCREEN_WIDTH * 0.95);
const GRID_SIZE = 8;
const SQUARE_SIZE = Math.floor((MOBILE_WIDTH - 80) / GRID_SIZE);

const colorMap = {
  1: '#FF6B6B',   // Rojo coral
  2: '#4ECDC4',   // Turquesa
  3: '#45B7D1',   // Azul cielo
  4: '#FFE66D',   // Amarillo
  5: '#95E1D3',   // Menta
  6: '#FF8C94',   // Rosa
  7: '#A8E6CE',   // Verde claro
  8: '#836FFF',   // Púrpura
  9: '#FFA07A',   // Salmón
  10: '#98FB98',  // Verde pastel
  11: '#DDA0DD',  // Ciruela
  12: '#87CEEB',  // Azul cielo claro
  13: '#F0E68C',  // Khaki
  14: '#E6E6FA',  // Lavanda
  15: '#FFA500',  // Naranja
  16: '#20B2AA',  // Verde agua
};

const patterns = {
  corazon: [
    0,1,1,0,0,1,1,0,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    0,1,1,1,1,1,1,0,
    0,1,1,1,1,1,1,0,
    0,0,1,1,1,1,0,0,
    0,0,1,1,1,1,0,0,
    0,0,0,1,1,0,0,0,
  ],
  estrella: [
    0,0,0,4,4,0,0,0,
    0,0,0,4,4,0,0,0,
    4,4,4,4,4,4,4,4,
    0,4,4,4,4,4,4,0,
    0,0,0,4,4,0,0,0,
    0,0,4,4,4,4,0,0,
    0,4,4,0,0,4,4,0,
    4,0,0,0,0,0,0,4,
  ],
  flor: [
    0,2,2,0,0,2,2,0,
    0,2,2,2,2,2,2,0,
    0,2,2,2,10,2,2,0,
    0,0,0,0,10,0,0,0,
    0,0,0,0,10,0,0,0,
    0,0,0,0,10,0,0,0,
    0,0,0,10,10,0,0,0,
    0,0,0,10,10,0,0,0,
  ]
};

const JuegoColores = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState('corazon');
  const [paintedSquares, setPaintedSquares] = useState(Array(GRID_SIZE * GRID_SIZE).fill(null));
  const [freeDraw, setFreeDraw] = useState(false);

  const paintSquare = (index) => {
    if (selectedColor) {
      const newPaintedSquares = [...paintedSquares];
      newPaintedSquares[index] = selectedColor;
      setPaintedSquares(newPaintedSquares);
    }
  };

  const resetCanvas = () => {
    setPaintedSquares(Array(GRID_SIZE * GRID_SIZE).fill(null));
  };

  return (
    <View style={styles.containerOuter}>
      <LinearGradient
        colors={['rgba(14,0,62,1)', 'rgba(34,2,148,1)']}
        style={styles.containerMobile}
      >

        {/* Canvas Area */}
        <View style={styles.canvasContainer}>
          <View style={styles.grid}>
            {(freeDraw ? Array(GRID_SIZE * GRID_SIZE).fill(0) : patterns[selectedPattern]).map((number, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.square,
                  { backgroundColor: paintedSquares[index] || '#ffffff20' }
                ]}
                onPress={() => paintSquare(index)}
              >
                {number !== 0 && !paintedSquares[index] && !freeDraw && (
                  <Text style={styles.numberText}>{number}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pattern Selector */}
        <View style={styles.patternSelector}>
          <TouchableOpacity
            style={[
              styles.patternButton,
              freeDraw && styles.selectedPattern
            ]}
            onPress={() => {
              setFreeDraw(true);
              resetCanvas();
            }}
          >
            <Text style={styles.patternText}>Dibujo Libre</Text>
          </TouchableOpacity>
          {Object.keys(patterns).map((pattern) => (
            <TouchableOpacity
              key={pattern}
              style={[
                styles.patternButton,
                selectedPattern === pattern && !freeDraw && styles.selectedPattern
              ]}
              onPress={() => {
                setSelectedPattern(pattern);
                setFreeDraw(false);
                resetCanvas();
              }}
            >
              <Text style={styles.patternText}>{pattern}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color Palette */}
        <View style={styles.colorPaletteContainer}>
          <View style={styles.colorPaletteGrid}>
            {Object.entries(colorMap).map(([number, color]) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderColor: selectedColor === color ? '#fff' : '#ffffff40',
                    borderWidth: selectedColor === color ? 3 : 2,
                  }
                ]}
                onPress={() => setSelectedColor(color)}
              >
                <Text style={[
                  styles.colorNumber,
                  { color: isLightColor(color) ? '#000' : '#fff' }
                ]}>
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetCanvas}>
          <Text style={styles.resetButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
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
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 20,
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
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  canvasContainer: {
    width: '100%',
    backgroundColor: '#ffffff20',
    marginVertical: 15,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SQUARE_SIZE * GRID_SIZE + 16,
    gap: 2,
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderWidth: 1,
    borderColor: '#ffffff40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  patternSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  patternButton: {
    backgroundColor: '#ffffff20',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  selectedPattern: {
    backgroundColor: '#ffffff40',
  },
  patternText: {
    color: '#fff',
    fontSize: 16,
  },
  colorPaletteContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff10',
    borderRadius: 10,
  },
  colorPaletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ffffff20',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Helper function to check if a color is light or dark
const isLightColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
  };
  
  export default JuegoColores;