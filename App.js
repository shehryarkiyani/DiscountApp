import  React,{useState} from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen'
import HistoryScreen from './components/HistoryScreen';
import color from './config/color'
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer  style={styles.container}>
      <Stack.Navigator screenOptions={{headerStyle: {
            backgroundColor: color.purple,
          },
          headerTintColor: color.white,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}>
        <Stack.Screen name="Discount App" component={StartScreen} />
        <Stack.Screen name="Your History" component={HistoryScreen} options={{
          headerLeft:()=><View></View>
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});
