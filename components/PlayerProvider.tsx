import React, { useState } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

import PlayerContext from './PlayerContext'
import VideoModal from './VideoModal'
import { Video } from './videos'

interface PlayerProviderProps {
  children: React.ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [video, setVideo] = useState<Video | null>(null)
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(true)

  return (
    <PlayerContext.Provider
      value={{ video, setVideo, isAnimationFinished, setIsAnimationFinished }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>{children}</View>
        {video && <VideoModal {...{ video }} />}
      </View>
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
