import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "./components/inicio";
import Home from "./components/home";
import JuegoNumeros from "./components/games/juegoNumeros";
import JuegoVocales from "./components/games/juegoVocales";
import JuegoAnimales from "./components/games/juegoAnimales";
import JuegoColores from "./components/games/juegoColores";
import JuegoFiguras from "./components/games/juegoFiguras";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="JuegoNumeros" component={JuegoNumeros}/>
        <Stack.Screen name="JuegoVocales" component={JuegoVocales}/>
        <Stack.Screen name="JuegoAnimales" component={JuegoAnimales}/>
        <Stack.Screen name="JuegoColores" component={JuegoColores}/>
        <Stack.Screen name="JuegoFiguras" component={JuegoFiguras}/>
      </Stack.Navigator>
    </NavigationContainer>
  );}