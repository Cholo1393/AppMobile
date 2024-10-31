// screens/HomeScreen.js (ajusté pour le Basketball)
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({ navigation }) => {
//   const [selectedLeague, setSelectedLeague] = useState('');
//   const [photo, setPhoto] = useState(null);

//   const leagues = [
//     // Ligues de Football
//     { label: 'Premier League', value: 'PL' },
//     { label: 'Serie A', value: 'SA' },
//     { label: 'Bundesliga', value: 'BL1' },
//     { label: 'Ligue 1', value: 'FL1' },
//     { label: 'Championship', value: 'ELC' },
//     { label: 'Primeira Liga', value: 'PPL' },
//     { label: 'La Liga', value: 'PD' },
//     { label: 'Copa Libertadores', value: 'CLI' },
//     { label: 'Campeonato Brasileiro Série A', value: 'BSA' },
//     { label: 'Eredivisie', value: 'DED' },
//     // Ligues de Basketball
//     { label: 'NBA', value: 'NBA' },
//     { label: 'EuroLeague', value: 'EL' },
//   ];

//   useEffect(() => {
//     (async () => {
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//       await ImagePicker.requestCameraPermissionsAsync();
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setPhoto(result.uri);
//     }
//   };

//   const getBackgroundStyle = () => {
//     switch (selectedLeague) {
//       case 'PL':
//         return styles.plBackground;
//       case 'SA':
//         return styles.saBackground;
//       case 'BL1':
//         return styles.bl1Background;
//       case 'FL1':
//         return styles.fl1Background;
//       case 'ELC':
//         return styles.elcBackground;
//       case 'PPL':
//         return styles.pplBackground;
//       case 'PD':
//         return styles.pdBackground;
//       case 'CLI':
//         return styles.cliBackground;
//       case 'BSA':
//         return styles.bsaBackground;
//       case 'DED':
//         return styles.dedBackground;
//       case 'NBA':
//         return styles.nbaBackground;
//       case 'EL':
//         return styles.elBackground;
//       default:
//         return styles.defaultBackground;
//     }
//   };

//   return (
//     <ImageBackground source={getBackgroundStyle().backgroundImage} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <Text style={styles.title}>Select a League</Text>
//         {leagues.map((league) => (
//           <TouchableOpacity
//             key={league.value}
//             style={[styles.button, getBackgroundStyle().buttonBackground]}
//             onPress={() => {
//               if (league.value === 'NBA' || league.value === 'EL') {
//                 navigation.navigate('Basketball', { league: league.value });
//               } else {
//                 setSelectedLeague(league.value);
//               }
//             }}
//           >
//             <Text style={styles.buttonText}>{league.label}</Text>
//           </TouchableOpacity>
//         ))}
//         <TouchableOpacity
//           style={[styles.button, getBackgroundStyle().buttonBackground]}
//           onPress={() => {
//             if (selectedLeague) {
//               navigation.navigate('SportDetail', { league: selectedLeague });
//             } else {
//               Alert.alert('Selection Error', 'Please select a league first.');
//             }
//           }}
//         >
//           <Text style={styles.buttonText}>Show Matches</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, getBackgroundStyle().buttonBackground]} onPress={pickImage}>
//           <Text style={styles.buttonText}>Pick an Image</Text>
//         </TouchableOpacity>
//         {photo && <Image source={{ uri: photo }} style={styles.image} />}
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#fff',
//   },
//   button: {
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//     width: '80%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: width * 0.9,
//     height: width * 0.9 * 3 / 4,  
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   defaultBackground: {
//     backgroundImage: require('../assets/default-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#444',
//     },
//   },
//   plBackground: {
//     backgroundImage: require('../assets/premier-league-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#37003C',
//     },
//   },
//   saBackground: {
//     backgroundImage: require('../assets/serie-a-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#005CA9',
//     },
//   },
//   bl1Background: {
//     backgroundImage: require('../assets/bundesliga-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#E3000F',
//     },
//   },
//   fl1Background: {
//     backgroundImage: require('../assets/ligue1-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#004170',
//     },
//   },
//   elcBackground: {
//     backgroundImage: require('../assets/championship-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#6C1D45',
//     },
//   },
//   pplBackground: {
//     backgroundImage: require('../assets/primeira-liga-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#A60E37',
//     },
//   },
//   pdBackground: {
//     backgroundImage: require('../assets/la-liga-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#A50044',
//     },
//   },
//   cliBackground: {
//     backgroundImage: require('../assets/copa-libertadores-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#003A70',
//     },
//   },
//   bsaBackground: {
//     backgroundImage: require('../assets/campeonato-brasileiro-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#009739',
//     },
//   },
//   dedBackground: {
//     backgroundImage: require('../assets/eredivisie-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#FF6700',
//     },
//   },
//   nbaBackground: {
//     backgroundImage: require('../assets/nba-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#FCAA0A',
//     },
//   },
//   elBackground: {
//     backgroundImage: require('../assets/euroleague-bg.jpg'),
//     buttonBackground: {
//       backgroundColor: '#003C71',
//     },
//   },
// });

// export default HomeScreen;

// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [photo, setPhoto] = useState(null);

  const sports = [
    { label: 'Football', value: 'football' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Football US', value: 'football_us' },  
  ];

  const footballLeagues = [
    { label: 'Premier League', value: 'PL' },
    { label: 'Serie A', value: 'SA' },
    { label: 'Bundesliga', value: 'BL1' },
    { label: 'Ligue 1', value: 'FL1' },
    { label: 'Championship', value: 'ELC' },
    { label: 'Primeira Liga', value: 'PPL' },
    { label: 'La Liga', value: 'PD' },
    { label: 'Copa Libertadores', value: 'CLI' },
    { label: 'Campeonato Brasileiro Série A', value: 'BSA' },
    { label: 'Eredivisie', value: 'DED' },
  ];

  const footballUSLeagues = [  
    { label: 'NFL', value: 'NFL' },
    { label: 'CFL', value: 'CFL' },
  ];

  const leagues = [
    { label: 'NBA', value: 'NBA' },
    { label: 'EuroLeague', value: 'EL' },
  ];

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleBackPress = () => {
    setSelectedSport('');
    setSelectedLeague('');
    navigation.navigate('Home');
  };

  const getBackgroundStyle = () => {
    switch (selectedSport) {
      case 'football':
        return styles.footballBackground;
      case 'basketball':
        return styles.basketballBackground;
      case 'football_us':
        return styles.footballUSBackground;  
      default:
        return styles.defaultBackground;
    }
  };

  if (selectedSport === 'football') {
    return (
      <ImageBackground source={getBackgroundStyle().backgroundImage} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.buttonText}>Back to Sports</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select a Football League</Text>
          {footballLeagues.map((league) => (
            <TouchableOpacity
              key={league.value}
              style={[styles.button, getBackgroundStyle().buttonBackground]}
              onPress={() => {
                setSelectedLeague(league.value);
                navigation.navigate('SportDetail', { league: league.value });
              }}
            >
              <Text style={styles.buttonText}>{league.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, getBackgroundStyle().buttonBackground]} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </ScrollView>
      </ImageBackground>
    );
  }

  if (selectedSport === 'football_us') {  
    return (
      <ImageBackground source={getBackgroundStyle().backgroundImage} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.buttonText}>Back to Sports</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select a Football US League</Text>
          {footballUSLeagues.map((league) => (
            <TouchableOpacity
              key={league.value}
              style={[styles.button, getBackgroundStyle().buttonBackground]}
              onPress={() => {
                setSelectedLeague(league.value);
                navigation.navigate('FootballUSDetail', { league: league.value }); 
              }}
            >
              <Text style={styles.buttonText}>{league.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, getBackgroundStyle().buttonBackground]} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </ScrollView>
      </ImageBackground>
    );
  }

  if (selectedSport === 'basketball') {
    return (
      <ImageBackground source={getBackgroundStyle().backgroundImage} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.buttonText}>Back to Sports</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select a Basketball League</Text>
          {leagues.map((league) => (
            <TouchableOpacity
              key={league.value}
              style={[styles.button, getBackgroundStyle().buttonBackground]}
              onPress={() => {
                navigation.navigate('BasketballDetail', { league: league.value });
              }}
            >
              <Text style={styles.buttonText}>{league.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, getBackgroundStyle().buttonBackground]} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={getBackgroundStyle().backgroundImage} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Select a Sport</Text>
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport.value}
            style={[styles.button, getBackgroundStyle().buttonBackground]}
            onPress={() => setSelectedSport(sport.value)}
          >
            <Text style={styles.buttonText}>{sport.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.9,
    height: width * 0.9 * 3 / 4,  
    borderRadius: 8,
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FF6F00',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  defaultBackground: {
    backgroundImage: require('../assets/default-bg.jpg'),
    buttonBackground: {
      backgroundColor: '#444',
    },
  },
  footballBackground: {
    backgroundImage: require('../assets/football-bg.jpg'),
    buttonBackground: {
      backgroundColor: '#004D40',
    },
  },
  basketballBackground: {
    backgroundImage: require('../assets/basketball-bg.jpg'),
    buttonBackground: {
      backgroundColor: '#FF6F00',
    },
  },
  footballUSBackground: { 
    backgroundImage: require('../assets/football_us-bg.jpg'),
    buttonBackground: {
      backgroundColor: '#003f5c',
    },
  },
});

export default HomeScreen;
