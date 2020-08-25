import React, { useContext } from 'react'
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
} from 'react-native'
import Constants from 'expo-constants'

import VideoThumbnail from './VideoThumbnail'
import videos from './videos'
import PlayerContext from './PlayerContext'
import VideoModal from './VideoModal'
import { TAB_BAR_MAX_HEIGHT } from './AppTabBar'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height: height - Constants.statusBarHeight - TAB_BAR_MAX_HEIGHT,
  },
})

const Home = () => {
  const playerContext = useContext(PlayerContext)

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          <ScrollView>
            {videos.map((video) => (
              <VideoThumbnail key={video.id} {...{ video }} />
            ))}
          </ScrollView>
        </View>
        {playerContext?.video && <VideoModal video={playerContext.video} />}
      </View>
    </View>
  )
}

export default Home
