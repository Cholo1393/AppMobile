import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = '93df52b8fa18d772fdf66a5a7e441c9a22e7c5c392f4dbd603065c26135af802';

const BasketballDetail = ({ route }) => {
  const { eventId } = route.params; 
  const [eventDetails, setEventDetails] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`https://apiv2.allsportsapi.com/basketball/?met=Fixtures&APIkey=${API_KEY}&matchId=${eventId}`);
      
      console.log('Réponse API complète pour les détails de l\'événement:', response.data); 

      if (response.data && response.data.result && Array.isArray(response.data.result)) {
        if (response.data.result.length > 0) {
          setEventDetails(response.data.result[0]);
        } else {
          throw new Error('Aucun détail d\'événement disponible');
        }
      } else {
        throw new Error('Aucun détail d\'événement disponible');
      }
    } catch (error) {
      setError(`Erreur lors de la récupération des détails de l'événement: ${error.message}`);
      console.error('Erreur lors de la récupération des détails de l\'événement:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    if (eventDetails && eventDetails.home_team_key && eventDetails.away_team_key) {
      try {
        const [homeTeam, awayTeam] = await Promise.all([
          axios.get(`https://apiv2.allsportsapi.com/basketball/?met=Teams&APIkey=${API_KEY}&teamId=${eventDetails.home_team_key}`),
          axios.get(`https://apiv2.allsportsapi.com/basketball/?met=Teams&APIkey=${API_KEY}&teamId=${eventDetails.away_team_key}`)
        ]);

        console.log('Réponse API complète pour les équipes:', homeTeam.data, awayTeam.data); // Affichez la réponse pour débogage

        if (homeTeam.data && homeTeam.data.result && awayTeam.data && awayTeam.data.result) {
          setTeams([homeTeam.data.result[0], awayTeam.data.result[0]]);
        } else {
          throw new Error('Données d\'équipe non disponibles');
        }
      } catch (error) {
        setError(`Erreur lors de la récupération des informations des équipes: ${error.message}`);
        console.error('Erreur lors de la récupération des équipes:', error);
      }
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (eventDetails) {
      fetchTeams();
    }
  }, [eventDetails]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!eventDetails) {
    return (
      <View style={styles.container}>
        <Text>Aucun détail d'événement disponible.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Détails du Match</Text>
      <View style={styles.matchDetails}>
        <Text>Date: {eventDetails.event_date}</Text>
        <Text>Heure: {eventDetails.event_time}</Text>
        <Text>Status: {eventDetails.event_status}</Text>
        <Text>Ligue: {eventDetails.league_name}</Text>
        <Text>Événement: {eventDetails.event_final_result}</Text>
      </View>
      <View style={styles.teamsContainer}>
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <View key={index} style={styles.team}>
              <Text style={styles.teamName}>{team.team_name}</Text>
              <Image source={{ uri: team.team_logo }} style={styles.teamLogo} />
            </View>
          ))
        ) : (
          <Text>Aucune information sur les équipes disponible.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchDetails: {
    marginBottom: 20,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default BasketballDetail;
