// import React, { useState, useEffect, memo } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
// import SegmentedControl from '@react-native-community/segmented-control';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker'; // Import mis à jour

// const API_URL = 'https://api.football-data.org/v4';
// const API_KEY = 'cda42b6ad42041199cf72a17a8a173fc'; // Clé API

// const MatchItem = memo(({ item }) => (
//   <View style={styles.item}>
//     <Text style={styles.itemText}>
//       {item.homeTeam.name} vs {item.awayTeam.name}
//     </Text>
//     <Text style={styles.itemScore}>
//       {item.score.fullTime.home || 0} - {item.score.fullTime.away || 0}
//     </Text>
//   </View>
// ));

// const RankingItem = memo(({ item }) => (
//   <View style={styles.item}>
//     <Text style={styles.itemText}>
//       {item.team.name} - {item.points} pts - {item.position}ème
//     </Text>
//   </View>
// ));

// const TopScorerItem = memo(({ item }) => (
//   <View style={styles.item}>
//     <Text style={styles.itemText}>
//       {item.player.name} - {item.numberOfGoals || 0} buts
//     </Text>
//   </View>
// ));

// const renderMatches = ({ item }) => <MatchItem item={item} />;
// const renderRanking = ({ item }) => <RankingItem item={item} />;
// const renderTopScorers = ({ item }) => <TopScorerItem item={item} />;

// const SportDetail = ({ route }) => {
//   const { league } = route.params;
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [season, setSeason] = useState('2024');
//   const [matchday, setMatchday] = useState('1');
//   const [stage, setStage] = useState('REGULAR_SEASON');
//   const [status, setStatus] = useState('FINISHED');
//   const [venue, setVenue] = useState('');
//   const [matches, setMatches] = useState([]);
//   const [ranking, setRanking] = useState([]);
//   const [topScorers, setTopScorers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [seasonModalVisible, setSeasonModalVisible] = useState(false);
//   const [matchdayModalVisible, setMatchdayModalVisible] = useState(false);
//   const [stageModalVisible, setStageModalVisible] = useState(false);
//   const [statusModalVisible, setStatusModalVisible] = useState(false);
//   const [venueModalVisible, setVenueModalVisible] = useState(false);

//   const seasons = ['2022', '2023', '2024'];
//   const matchdays = Array.from({ length: 38 }, (_, i) => (i + 1).toString());
//   const stages = ['REGULAR_SEASON', 'GROUP_STAGE', 'KNOCKOUT_PHASE'];
//   const statuses = ['SCHEDULED', 'LIVE', 'FINISHED'];
//   const venues = ['', 'HOME', 'AWAY'];

//   const fetchMatches = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/competitions/${league}/matches`, {
//         headers: { 'X-Auth-Token': API_KEY },
//         params: {
//           season: season,
//           matchday: matchday,
//           stage: stage,
//           status: status,
//           venue: venue,
//         },
//       });
//       setMatches(response.data.matches || []);
//     } catch (error) {
//       console.error('Error fetching matches:', error.response ? error.response.data : error.message);
//       setError('Erreur lors du chargement des matchs.');
//     }
//   };

//   const fetchRanking = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/competitions/${league}/standings`, {
//         headers: { 'X-Auth-Token': API_KEY },
//         params: { season: season },
//       });
//       setRanking(response.data.standings[0]?.table || []);
//     } catch (error) {
//       console.error('Error fetching standings:', error.response ? error.response.data : error.message);
//       setError('Erreur lors du chargement du classement.');
//     }
//   };

//   const fetchTopScorers = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/competitions/${league}/scorers`, {
//         headers: { 'X-Auth-Token': API_KEY },
//         params: { season: season, limit: 10 },
//       });
//       setTopScorers(response.data.scorers || []);
//     } catch (error) {
//       console.error('Error fetching scorers:', error.response ? error.response.data : error.message);
//       setError('Erreur lors du chargement des meilleurs buteurs.');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         await Promise.all([fetchMatches(), fetchRanking(), fetchTopScorers()]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Erreur lors du chargement des données.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [season, matchday, stage, status, venue]);

//   const handleIndexChange = (event) => {
//     setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
//   };

//   const handleSeasonChange = (itemValue) => {
//     setSeason(itemValue);
//     setSeasonModalVisible(false);
//   };

//   const handleMatchdayChange = (itemValue) => {
//     setMatchday(itemValue);
//     setMatchdayModalVisible(false);
//   };

//   const handleStageChange = (itemValue) => {
//     setStage(itemValue);
//     setStageModalVisible(false);
//   };

//   const handleStatusChange = (itemValue) => {
//     setStatus(itemValue);
//     setStatusModalVisible(false);
//   };

//   const handleVenueChange = (itemValue) => {
//     setVenue(itemValue);
//     setVenueModalVisible(false);
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Détails du Sport</Text>
//         <View style={styles.filters}>
//           <TouchableOpacity onPress={() => setSeasonModalVisible(true)} style={styles.filterButton}>
//             <Text style={styles.filterButtonText}>Saison: {season}</Text>
//           </TouchableOpacity>
//           {selectedIndex === 0 && (
//             <>
//               <TouchableOpacity onPress={() => setMatchdayModalVisible(true)} style={styles.filterButton}>
//                 <Text style={styles.filterButtonText}>Journée: {matchday}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setStageModalVisible(true)} style={styles.filterButton}>
//                 <Text style={styles.filterButtonText}>Stage: {stage}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setStatusModalVisible(true)} style={styles.filterButton}>
//                 <Text style={styles.filterButtonText}>Statut: {status}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setVenueModalVisible(true)} style={styles.filterButton}>
//                 <Text style={styles.filterButtonText}>Lieu: {venue || 'Tous'}</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </View>

//       <SegmentedControl
//         values={['Matches', 'Classement', 'Meilleurs Buteurs']}
//         selectedIndex={selectedIndex}
//         onChange={handleIndexChange}
//         style={styles.segmentedControl}
//       />

//       <View style={styles.listContainer}>
//         {selectedIndex === 0 && (
//           <FlatList
//             data={matches}
//             renderItem={renderMatches}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         )}
//         {selectedIndex === 1 && (
//           <FlatList
//             data={ranking}
//             renderItem={renderRanking}
//             keyExtractor={(item) => item.team.id.toString()}
//           />
//         )}
//         {selectedIndex === 2 && (
//           <FlatList
//             data={topScorers}
//             renderItem={renderTopScorers}
//             keyExtractor={(item) => item.player.id.toString()}
//           />
//         )}
//       </View>

//       {/* Modals */}
//       <Modal visible={seasonModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker selectedValue={season} onValueChange={handleSeasonChange} style={styles.picker}>
//             {seasons.map((season) => (
//               <Picker.Item key={season} label={season} value={season} />
//             ))}
//           </Picker>
//         </View>
//       </Modal>

//       <Modal visible={matchdayModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker selectedValue={matchday} onValueChange={handleMatchdayChange} style={styles.picker}>
//             {matchdays.map((day) => (
//               <Picker.Item key={day} label={`Journée ${day}`} value={day} />
//             ))}
//           </Picker>
//         </View>
//       </Modal>

//       <Modal visible={stageModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker selectedValue={stage} onValueChange={handleStageChange} style={styles.picker}>
//             {stages.map((stage) => (
//               <Picker.Item key={stage} label={stage} value={stage} />
//             ))}
//           </Picker>
//         </View>
//       </Modal>

//       <Modal visible={statusModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker selectedValue={status} onValueChange={handleStatusChange} style={styles.picker}>
//             {statuses.map((status) => (
//               <Picker.Item key={status} label={status} value={status} />
//             ))}
//           </Picker>
//         </View>
//       </Modal>

//       <Modal visible={venueModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker selectedValue={venue} onValueChange={handleVenueChange} style={styles.picker}>
//             {venues.map((venue) => (
//               <Picker.Item key={venue} label={venue || 'Tous'} value={venue} />
//             ))}
//           </Picker>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   filters: {
//     marginTop: 16,
//   },
//   filterButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     backgroundColor: '#007bff',
//     marginBottom: 8,
//   },
//   filterButtonText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   segmentedControl: {
//     marginVertical: 16,
//   },
//   listContainer: {
//     flex: 1,
//   },
//   item: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   itemScore: {
//     fontSize: 14,
//     color: '#666',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   picker: {
//     width: '80%',
//     backgroundColor: '#fff',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default SportDetail;
 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const API_URL = 'https://api.football-data.org/v4';
const API_KEY = 'cda42b6ad42041199cf72a17a8a173fc';

const COMPETITIONS = {
  PL: { name: 'Premier League', image: require('../assets/premier-league-bg.jpg'), color: '#0066cc' },
  CL: { name: 'Champions League', image: require('../assets/championship-bg.jpg'), color: '#0033a0' },
  LL: { name: 'La Liga', image: require('../assets/la-liga-bg.jpg'), color: '#d6004c' },
  BL: { name: 'Bundesliga', image: require('../assets/bundesliga-bg.jpg'), color: '#e4002b' },
  SA: { name: 'Serie A', image: require('../assets/serie-a-bg.jpg'), color: '#1d2d50' },
  FL1: { name: 'Ligue 1', image: require('../assets/ligue1-bg.jpg'), color: '#004d6f' },
  NBA: { name: 'NBA', image: require('../assets/nba-bg.jpg'), color: '#fbb03b' },
  COPA: { name: 'Copa Libertadores', image: require('../assets/copa-libertadores-bg.jpg'), color: '#007a33' },
  BR: { name: 'Campeonato Brasileiro', image: require('../assets/campeonato-brasileiro-bg.jpg'), color: '#006b3f' },
};

const MatchItem = ({ item }) => (
  <View style={styles.matchItem}>
    <Text style={styles.matchTitle}>
      {item.homeTeam.name} vs {item.awayTeam.name}
    </Text>
    <Text style={styles.matchScore}>
      {item.score.fullTime.home || 0} - {item.score.fullTime.away || 0}
    </Text>
  </View>
);

const SportDetail = ({ route }) => {
  const { league } = route.params;
  const [season, setSeason] = useState('2024');
  const [matchday, setMatchday] = useState('1');
  const [stage, setStage] = useState('REGULAR_SEASON');
  const [status, setStatus] = useState('FINISHED');
  const [venue, setVenue] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seasonModalVisible, setSeasonModalVisible] = useState(false);
  const [matchdayModalVisible, setMatchdayModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [venueModalVisible, setVenueModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [teams, setTeams] = useState([]);

  const seasons = ['2022', '2023', '2024'];
  const matchdays = Array.from({ length: 38 }, (_, i) => (i + 1).toString());
  const stages = ['REGULAR_SEASON', 'GROUP_STAGE', 'KNOCKOUT_PHASE'];
  const statuses = ['SCHEDULED', 'LIVE', 'FINISHED'];
  const venues = ['', 'HOME', 'AWAY'];

  useEffect(() => {
    if (COMPETITIONS[league]) {
      fetchTeams();
    } else {
      console.error('Invalid league:', league);
    }
  }, [league]);

  useEffect(() => {
    if (COMPETITIONS[league]) {
      fetchMatches();
    } else {
      console.error('Invalid league:', league);
    }
  }, [season, matchday, stage, status, venue, selectedTeam]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${API_URL}/competitions/${league}/teams`, {
        headers: { 'X-Auth-Token': API_KEY },
      });
      setTeams(response.data.teams || []);
    } catch (error) {
      console.error('Error fetching teams:', error.response ? error.response.data : error.message);
      setError('Erreur lors du chargement des équipes.');
    }
  };

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        season,
        matchday: matchday !== '' ? matchday : undefined,
        stage: stage !== '' ? stage : undefined,
        status: status !== '' ? status : undefined,
        dateFrom: `${season}-01-01`,
        dateTo: `${season}-12-31`,
        venue: venue || undefined,
        limit: 100
      };

      let url = `${API_URL}/competitions/${league}/matches`;

      if (selectedTeam) {
        url = `${API_URL}/teams/${selectedTeam}/matches/`;
        params.dateFrom = `${season}-01-01`;
        params.dateTo = `${season}-12-31`;
      }

      console.log('Fetching matches with URL:', url, 'and params:', params);

      const response = await axios.get(url, {
        headers: { 'X-Auth-Token': API_KEY },
        params
      });

      console.log('Matches data:', response.data.matches);
      setMatches(response.data.matches || []);
    } catch (error) {
      console.error('Error fetching matches:', error.response ? error.response.data : error.message);
      setError('Erreur lors du chargement des matchs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (itemValue) => {
    setSeason(itemValue);
    setSeasonModalVisible(false);
  };

  const handleMatchdayChange = (itemValue) => {
    setMatchday(itemValue);
    setMatchdayModalVisible(false);
  };

  const handleStageChange = (itemValue) => {
    setStage(itemValue);
    setStageModalVisible(false);
  };

  const handleStatusChange = (itemValue) => {
    setStatus(itemValue);
    setStatusModalVisible(false);
  };

  const handleVenueChange = (itemValue) => {
    setVenue(itemValue);
    setVenueModalVisible(false);
  };

  const handleTeamChange = (itemValue) => {
    setSelectedTeam(itemValue);
    setTeamModalVisible(false);
  };

  const getBackgroundImage = () => {
    return COMPETITIONS[league]?.image || require('../assets/default-bg.jpg');
  };

  const getPrimaryColor = () => {
    return COMPETITIONS[league]?.color || '#ffffff';
  };

  const shareMatches = async () => {
    const fileUri = FileSystem.documentDirectory + 'matches_results.txt';
    const matchResults = matches.map(match => 
      `${match.homeTeam.name} vs ${match.awayTeam.name}: ${match.score.fullTime.home || 0} - ${match.score.fullTime.away || 0}`
    ).join('\n');
    
    await FileSystem.writeAsStringAsync(fileUri, matchResults);
    alert('Résultats enregistrés');

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      alert('Le partage n\'est pas disponible sur votre plateforme');
    }
  };

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.background}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: getPrimaryColor() }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {COMPETITIONS[league]?.name || 'Unknown League'}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.filters}>
              <TouchableOpacity onPress={() => setSeasonModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Saison: {season}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMatchdayModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Journée: {matchday}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStageModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Phase: {stage}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStatusModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Statut: {status}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVenueModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Lieu: {venue || 'Tous'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTeamModalVisible(true)} style={[styles.filterButton, { backgroundColor: getPrimaryColor() }]}>
                <Text style={styles.filterButtonText}>Équipe: {selectedTeam || 'Toutes'}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={matches}
              renderItem={MatchItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.matchesList}
            />

            <TouchableOpacity onPress={shareMatches} style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Partager les résultats</Text>
            </TouchableOpacity>
          </>
        )}

        <Modal visible={seasonModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez la saison</Text>
              <Picker
                selectedValue={season}
                onValueChange={handleSeasonChange}
                style={styles.picker}
              >
                {seasons.map(season => (
                  <Picker.Item key={season} label={season} value={season} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        <Modal visible={matchdayModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez la journée</Text>
              <Picker
                selectedValue={matchday}
                onValueChange={handleMatchdayChange}
                style={styles.picker}
              >
                {matchdays.map(day => (
                  <Picker.Item key={day} label={day} value={day} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        <Modal visible={stageModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez la phase</Text>
              <Picker
                selectedValue={stage}
                onValueChange={handleStageChange}
                style={styles.picker}
              >
                {stages.map(stage => (
                  <Picker.Item key={stage} label={stage} value={stage} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        <Modal visible={statusModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez le statut</Text>
              <Picker
                selectedValue={status}
                onValueChange={handleStatusChange}
                style={styles.picker}
              >
                {statuses.map(status => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        <Modal visible={venueModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez le lieu</Text>
              <Picker
                selectedValue={venue}
                onValueChange={handleVenueChange}
                style={styles.picker}
              >
                {venues.map(venue => (
                  <Picker.Item key={venue} label={venue || 'Tous'} value={venue} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        <Modal visible={teamModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez l'équipe</Text>
              <Picker
                selectedValue={selectedTeam}
                onValueChange={handleTeamChange}
                style={styles.picker}
              >
                <Picker.Item label="Toutes" value="" />
                {teams.map(team => (
                  <Picker.Item key={team.id} label={team.name} value={team.id} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    margin: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  matchesList: {
    padding: 10,
  },
  matchItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchScore: {
    fontSize: 16,
    color: '#555',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  shareButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 200,
    width: '100%',
  },
});

export default SportDetail;

























