import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';

// Remplacez les valeurs par vos informations API
const API_URL = 'https://api.sportradar.com/nfl/official';
const API_KEY = 'cLhriR4zHS48tvWd7Fz2Y8F8Q32A6QaD47JWKXrx'; // Votre clé API
const ACCESS_LEVEL = 'production'; // ou 'official', selon votre clé API
const LANGUAGE = 'en'; // Changez si nécessaire
const FORMAT = 'json';

const FootballUSDetail = ({ route }) => {
  const { gameId } = route.params; // GameId doit être passé depuis l'écran précédent
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameData();
  }, [gameId]);

  const fetchGameData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_URL}/${ACCESS_LEVEL}/v7/${LANGUAGE}/games/${gameId}/schedule.${FORMAT}`;
      const response = await axios.get(url, { 
        headers: { 
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        } 
      });
      setGameData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données du jeu:', error.response ? error.response.data : error.message);
      setError('Erreur lors du chargement des données du jeu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!gameData) {
    return <Text style={styles.errorText}>Aucune donnée disponible.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{gameData.game.title}</Text>
        <Text style={styles.subtitle}>Date: {new Date(gameData.game.scheduled).toLocaleString()}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teams</Text>
          <Text>Home Team: {gameData.game.home.name} ({gameData.game.home.alias})</Text>
          <Text>Away Team: {gameData.game.away.name} ({gameData.game.away.alias})</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score</Text>
          <Text>Home Points: {gameData.scoring.home_points}</Text>
          <Text>Away Points: {gameData.scoring.away_points}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          <Text>Attendance: {gameData.attendance}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather</Text>
          <Text>Condition: {gameData.weather.condition}</Text>
          <Text>Temperature: {gameData.weather.temp}°F</Text>
          <Text>Humidity: {gameData.weather.humidity}%</Text>
          <Text>Wind: {gameData.weather.wind.direction} at {gameData.weather.wind.speed} MPH</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Venue</Text>
          <Text>Name: {gameData.game.venue.name}</Text>
          <Text>Address: {gameData.game.venue.address}</Text>
          <Text>City: {gameData.game.venue.city}</Text>
          <Text>State: {gameData.game.venue.state}</Text>
          <Text>Country: {gameData.game.venue.country}</Text>
          <Text>Capacity: {gameData.game.venue.capacity}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default FootballUSDetail;
