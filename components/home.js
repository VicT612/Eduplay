import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './card';


export default function Home() {
  const navigation = useNavigation();
  const datos=[
    {
      titulo: 'NUMEROS',
      imagen: require('../assets/images/cards.jpg'),
      routeName: 'JuegoNumeros',
    },
    {
      titulo: 'VOCALES',
      imagen: require('../assets/images/cards2.jpg'),
      routeName: 'JuegoVocales',
    },
    {
      titulo: 'ANIMALES',
      imagen: require('../assets/images/cards.jpg'),
      routeName: 'JuegoAnimales',
    },
    {
      titulo: 'COLORES',
      imagen: require('../assets/images/cards.jpg'),
      routeName: 'JuegoColores',
    },
    {
      titulo: 'FIGURAS',
      imagen: require('../assets/images/cards.jpg'),
      routeName: 'JuegoFiguras', 
    }
  ];
  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B0A4C', '#4B169D']}
        style={styles.fondo}>
          <ScrollView>
            <Text style={styles.titulo}>Elige un juego </Text>
            <View style={styles.contenido}>
              {datos.map((dato, index) => (
                <Card
                  key={index}
                  titulo={dato.titulo}
                  imagen={dato.imagen}
                  onPress={() => handleCardPress(dato.routeName)}
                />
              ))}
            </View>
          </ScrollView>
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
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    marginTop: 20,
  },
});