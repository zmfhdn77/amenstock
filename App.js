import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Sub1Screen from './Sub1Screen';
import Sub2Screen from './Sub2Screen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="추가 매수 시뮬레이션" component={Sub1Screen} />
        <Stack.Screen name="종목 전환 시뮬레이션" component={Sub2Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;