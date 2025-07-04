import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Src/Screen/HomeScreen';
import Form from './Src/Screen/Form';
import ProductListScreen from './Src/Screen/ProductListScreen';
import ProductDetailScreen from './Src/Screen/ProductDetailScreen';
import CartScreen from './Src/Screen/CartScreen';
import LoginScreen from './Src/Screen/LoginScreen';
import SplashScreen from './Src/Screen/Splash';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
    headerStyle: { backgroundColor: '#000' },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: '600' },
    contentStyle: { backgroundColor: '#000' }, 
  }}
  
      >
         <Stack.Screen
          name="Splash"
          component={SplashScreen}
        
           options={{
    headerShown: false,
  }}
        />

   <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          // options={{title: 'Home', headerTitleAlign: 'center'}}
           options={{
    headerShown: false,
  }}
        />
        
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{title: 'Home', headerTitleAlign: 'center'}}
           options={{
    headerShown: false,
  }}
        />
        <Stack.Screen
        name="Form"
        component={Form}
        options={{title: 'Detail Screen', headerTitleAlign: 'center',}}
        />
        
          <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;