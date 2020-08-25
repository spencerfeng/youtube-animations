import React, { useContext, useRef } from 'react'
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
} from 'react-native'
import Constants from 'expo-constants'
import Animated, {
  Node,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import VideoThumbnail from './VideoThumbnail'
import videos from './videos'
import PlayerContext from './PlayerContext'
import AnimationContext from './AnimationContext'
import VideoModal, { bottomBound } from './VideoModal'
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
  const animationContext = useContext(AnimationContext)

  const animiatedHeight = useRef<Node<number>>(
    interpolate(
      animationContext?.modalTY?.current === undefined
        ? 0
        : animationContext?.modalTY?.current,
      {
        inputRange: [0, bottomBound],
        outputRange: [
          height - Constants.statusBarHeight,
          height - Constants.statusBarHeight - TAB_BAR_MAX_HEIGHT,
        ],
        extrapolate: Extrapolate.CLAMP,
      }
    )
  )

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={[styles.container, { height: animiatedHeight.current }]}
      >
        <View style={StyleSheet.absoluteFill}>
          <ScrollView>
            {videos.map((video) => (
              <VideoThumbnail key={video.id} {...{ video }} />
            ))}
          </ScrollView>
        </View>
        {playerContext?.video && <VideoModal video={playerContext.video} />}
      </Animated.View>
    </>
  )
}

export default Home
