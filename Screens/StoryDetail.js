import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {HACKER_NEWS_BASE_URL} from '@env';

const StoryDetail = ({route}) => {
  const {storyId} = route.params;
  const [storyDetails, setStoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchStoryDetails();
  }, []);

  const fetchStoryDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${HACKER_NEWS_BASE_URL}/item/${storyId}.json`,
      );
      setStoryDetails(response.data);
    } catch (error) {
      console.error('Error fetching story details:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0096C1" />
      </View>
    );
  }

  if (!storyDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Story not found.</Text>
      </View>
    );
  }

  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const commentsToShow = showAllComments
    ? storyDetails.kids
    : storyDetails.kids.slice(0, 5);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{storyDetails.title}</Text>

      {storyDetails.url && (
        <TouchableOpacity onPress={() => Linking.openURL(storyDetails.url)}>
          <Text style={styles.url}>{storyDetails.url}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.byline}>By: {storyDetails.by}</Text>
      <Text style={styles.text}>Score: {storyDetails.score}</Text>
      <Text style={styles.text}>Comments: {storyDetails.descendants}</Text>
      <Text style={styles.text}>
        Time: {new Date(storyDetails.time * 1000).toLocaleString()}
      </Text>

      <Text style={styles.text}>Kids (Subcomments):</Text>
      {commentsToShow.length > 0 ? (
        <View style={styles.kidsContainer}>
          {commentsToShow.map((kidId, index) => (
            <Text key={index} style={styles.kidText}>
              Comment ID: {kidId}
            </Text>
          ))}
          {storyDetails.kids.length > 5 && !showAllComments && (
            <TouchableOpacity onPress={handleShowMoreComments}>
              <Text style={styles.moreComments}>and more...</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.text}>No comments available.</Text>
      )}

      <Text style={styles.text}>Story ID: {storyDetails.id}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  url: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 8,
  },
  byline: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  kidsContainer: {
    marginBottom: 8,
  },
  kidText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  moreComments: {
    fontSize: 14,
    color: '#0096C1',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default StoryDetail;
