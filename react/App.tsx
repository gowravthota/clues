import StartScreen from './Start';
import MainScreen from './Main'
import SelectScreen from './Select'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Select"
          component={SelectScreen}
          options={{
            headerShown: false,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;