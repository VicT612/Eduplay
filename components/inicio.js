import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B0A4C', '#4B169D']}
        style={styles.fondo}>
          <Text style={styles.titulo}>EDUPLAY </Text>
          <Pressable style={styles.contenedorboton} onPress={()=>navigation.navigate('Home')}>
            <Text style={styles.tituloboton}>JUGAR</Text>
          </Pressable>
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
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tituloboton:{
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenedorboton:{
    backgroundColor: '#0053BC',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginTop: 90,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
});

