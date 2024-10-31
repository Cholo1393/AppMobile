import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SportDetail from './screens/SportDetail';
import BasketballDetail from './screens/BasketballDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SportDetail" component={SportDetail} />
        <Stack.Screen name="BasketballDetail" component={BasketballDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// App.js

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import SportDetail from './screens/SportDetail';
// import BasketballDetail from './screens/BasketballDetail';
// import FootballUSDetail from './screens/FootballUSDetail';  // Import du nouveau détail

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
//         <Stack.Screen name="SportDetail" component={SportDetail} options={{ title: 'Sport Details' }} />
//         <Stack.Screen name="BasketballDetail" component={BasketballDetail} options={{ title: 'Basketball Details' }} />
//         <Stack.Screen name="FootballUSDetail" component={FootballUSDetail} options={{ title: 'Football US Details' }} />  {/* Ajout du détail pour Football US */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
// import SportDetail from './screens/SportDetail';
// import BasketballDetail from './screens/BasketballDetail';
// import FootballUSDetail from './screens/FootballUSDetail';  // Assurez-vous que ce fichier existe et est correctement exporté

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ title: 'Home' }} 
//         />
//         <Stack.Screen 
//           name="SportDetail" 
//           component={SportDetail} 
//           options={{ title: 'Sport Details' }} 
//         />
//         <Stack.Screen 
//           name="BasketballDetail" 
//           component={BasketballDetail} 
//           options={{ title: 'Basketball Details' }} 
//         />
//         <Stack.Screen 
//           name="FootballUSDetail" 
//           component={FootballUSDetail} 
//           options={{ title: 'Football US Details' }} 
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
