import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import VideoThumbnail from './VideoThumbnail'
import videos from './videos'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
})

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      {videos.map((video) => (
        <VideoThumbnail key={video.id} {...{ video }} />
      ))}
    </ScrollView>
  )
}

export default Home
