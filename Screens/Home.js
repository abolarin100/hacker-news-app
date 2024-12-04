import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchStories, incrementPage} from '../redux/slices/storiesSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {stories, loading, page} = useSelector(state => state.stories);

  useEffect(() => {
    dispatch(fetchStories(page));
  }, [dispatch, page]);

  const handlePress = storyId => {
    navigation.navigate('StoryDetail', {storyId});
  };

  const handleEndReached = () => {
    dispatch(incrementPage());
  };

  return (
    <View style={styles.container}>
      {stories.length === 0 && !loading && (
        <Text style={styles.empty}>No stories available.</Text>
      )}
      <FlatList
        data={stories}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `story-${index}`
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.byline}>By: {item.by || 'Unknown Author'}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator size="small" color="#0096C1" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loader: {
    marginTop: '50%',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  byline: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default Home;
