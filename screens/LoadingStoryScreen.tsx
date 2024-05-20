import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ResizeMode, Video } from 'expo-av';

const LoadingStoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Video
        style={styles.backgroundVideo}
        resizeMode={ResizeMode.COVER}
        source={require('../assets/sky-loading-compress.mp4')}
        isLooping={true}
        shouldPlay={true}
      />
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Aguarde!</Text>
        <Text style={styles.loadingText}>Estamos criando a sua história...</Text>
      </View>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  loadingView: {
    position: 'absolute',
    top: '50%',
    width: '100%',
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  }
})

export default LoadingStoryScreen;